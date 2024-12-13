import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log('posting to newsletter api');
  const body = await req.json();
  const { email, recaptchaToken } = body;
  

  if (!email) {
    return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
  }

  if (!recaptchaToken) {
    return NextResponse.json({ success: false, message: 'reCAPTCHA token is required' }, { status: 400 });
  }


   // first verify reCAPTCHA token with Google 
   const secretKey = process.env.RECAPTCHA_SECRET_KEY;
   console.log(secretKey)
   if (!secretKey) {
     return NextResponse.json(
       { success: false, message: 'Server configuration error: Missing reCAPTCHA secret key.' },
       { status: 500 }
     );
   }

   try {
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

    const verificationResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${recaptchaToken}`,
    });

    const verificationResult = await verificationResponse.json();

    if (!verificationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'reCAPTCHA verification failed. Please try again.',
          errors: verificationResult['error-codes'],
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('reCAPTCHA Verification Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify reCAPTCHA token. Please try again.' },
      { status: 500 }
    );
  }
 
  // add subscriber via GraphQL API for subscription

  try {
    console.log('adding subscriber to wordpress db')
    const response = await fetch(process.env.GRAPHQL_API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation AddSubscriber($email: String!) {
            addNewsletterSubscriber(input: { email: $email }) {
              subscriber
              success
              message
            }
          }
        `,
        variables: { email },
      }),
    }); 

    if (!response.ok) {
      console.error('GraphQL API Error:', response.status, response.statusText);
      throw new Error(`GraphQL API request failed with status ${response.status}`);
    }
  
    const result = await response.json();
  
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      return NextResponse.json({ success: false, message: 'GraphQL error', errors: result.errors }, { status: 500 });
    }
  
    if (result.data.addNewsletterSubscriber.success) {
      return NextResponse.json(
        { success: true, message: result.data.addNewsletterSubscriber.message });
    } else {
      return NextResponse.json(
        { success: false, message: result.data.addNewsletterSubscriber.message }, 
        { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' }, 
      { status: 500 });
  }
  
}
