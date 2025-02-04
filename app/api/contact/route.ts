import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_name, user_email, message } = body;

    console.log('API route hit');
    console.log('Request body:', body);

    if (!user_name || !user_email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    console.log('Preparing to send email');
    console.log('GMAIL_USER:', process.env.GMAIL_USER);

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Missing GMAIL_USER or GMAIL_PASS environment variables');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    console.log('Transporter created');

    let info = await transporter.sendMail({
      from: `"Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New message from ${user_name}`,
      text: `Name: ${user_name}\nEmail: ${user_email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${user_name}</p>
             <p><strong>Email:</strong> ${user_email}</p>
             <p><strong>Message:</strong> ${message}</p>`
    });

    console.log('Email sent:', info.messageId);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({ message: 'Failed to send email', error: errorMessage }, { status: 500 });
  }
}