import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
  }

  try {
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
      return NextResponse.json({ success: true, message: result.data.addNewsletterSubscriber.message });
    } else {
      return NextResponse.json({ success: false, message: result.data.addNewsletterSubscriber.message }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 });
  }
  
}
