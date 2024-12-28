import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, message, recaptcha  } = await req.json();

  if (!name || !email || !message || !recaptcha) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }


    // Verify reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY_CONTACT_FORM || '';
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptcha}`;
  
    const recaptchaResponse = await fetch(recaptchaUrl, {
      method: 'POST',
    });
    const recaptchaData = await recaptchaResponse.json();
  
    if (!recaptchaData.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 });
    }
  

  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: 'admin@tradeinformer.com',
          pass: process.env.EMAIL_PASS,
        },
        logger: true, // Enable logging
        debug: true,  // Enable debug output
      });

    // Configure the email message
    const mailOptions = {
      from: "admin@tradeinformer.com",
      to: 'admin@tradeinformer.com', 
      subject: `Contact Us Form Submission from ${name}`,
      text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send the email.' }, { status: 500 });
  }
}
