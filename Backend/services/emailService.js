import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, subject, message }) => {
  // Create a transporter
  // For production, you would use a real service like SendGrid, Resend, or SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `GyaanSetu <${process.env.EMAIL_FROM || 'noreply@gyaansetu.in'}>`,
    to: email,
    subject: subject,
    text: message,
    html: `<div>${message}</div>`,
  };

  // If no credentials, log the message and return
  if (!process.env.EMAIL_USER) {
    console.log('--- EMAIL MOCK ---');
    console.log(`To: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('------------------');
    return;
  }

  await transporter.sendMail(mailOptions);
};
