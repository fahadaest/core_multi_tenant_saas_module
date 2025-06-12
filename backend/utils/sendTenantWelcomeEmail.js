// utils/sendTenantWelcomeEmail.js
const nodemailer = require('nodemailer');

module.exports = async function sendTenantWelcomeEmail(toEmail, domain) {
    const loginLink = `${process.env.CLIENT_URL}/${domain}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Multi-Tenant App" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Welcome to Multi-Tenant SaaS App',
        html: `
      <h2>Hi!</h2>
      <p>Your tenant space is ready.</p>
      <p><strong>Login here:</strong> <a href="${loginLink}">${loginLink}</a></p>
      <br/>
      <p>Regards,<br/>Multi-Tenant Team</p>
    `,
    });
};
