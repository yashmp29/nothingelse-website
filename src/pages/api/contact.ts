import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, topic, message } = req.body;

  // Validate the request
  if (!name || !email || !topic || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a transporter
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'nothingelsequeries@gmail.com',
      subject: `Case Study Suggestion: ${topic}`,
      html: `
        <h2>New Case Study Suggestion</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>This message was sent from the NOTHINGelse website contact form.</p>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
}
