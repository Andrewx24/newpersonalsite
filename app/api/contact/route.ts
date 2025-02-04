// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // First, verify that our environment variables exist
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Email configuration is incomplete:', {
        hasGmailUser: !!process.env.GMAIL_USER,
        hasGmailPass: !!process.env.GMAIL_PASS
      });
      throw new Error('Email service is not properly configured');
    }

    // Parse the incoming request body
    const body = await request.json();
    const { user_name, user_email, message } = body;

    // Validate the required fields
    if (!user_name || !user_email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the email transporter with the correct configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.GMAIL_USER,    // Using the correct environment variable
        pass: process.env.GMAIL_PASS     // Using the correct environment variable
      },
      // Enable logging in development
      ...(process.env.NODE_ENV === 'development' && {
        debug: true,
        logger: true
      })
    });

    // Verify the transporter configuration
    await transporter.verify()
      .then(() => console.log('SMTP connection verified'))
      .catch((error) => {
        console.error('SMTP verification failed:', error);
        throw error;
      });

    // Send the email
    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Contact Message from ${user_name}`,
      text: `
Name: ${user_name}
Email: ${user_email}
Message: ${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
  <h2 style="color: #333;">New Contact Form Message</h2>
  <div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
    <p><strong>Name:</strong> ${user_name}</p>
    <p><strong>Email:</strong> ${user_email}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-line;">${message}</p>
  </div>
</div>
      `
    });

    console.log('Message sent successfully:', info.messageId);
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    // Enhanced error logging for debugging
    console.error('Failed to send email:', {
      error: error instanceof Error ? {
        message: error.message,
        name: error.name,
        stack: error.stack
      } : error
    });

    return NextResponse.json(
      { 
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}