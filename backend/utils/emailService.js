import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // Create a transporter using nodemailer
    // For local development, you could use Mailtrap
    // Production should use SendGrid, Postmark, AWS SES etc.
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
        port: process.env.SMTP_PORT || 2525,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    // Define the email options
    const message = {
        from: `${process.env.FROM_NAME || 'CodeNexus Studio'} <${process.env.FROM_EMAIL || 'noreply@codenexusstudio.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.htmlMessage || `<p>${options.message.replace(/\n/g, '<br>')}</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
