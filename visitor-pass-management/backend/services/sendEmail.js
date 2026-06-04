const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (email, otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP Verification",

        html: `
      <h2>Visitor Pass Management</h2>

      <p>Your OTP is:</p>

      <h1>${otp}</h1>

      <p>Valid for 5 minutes.</p>
    `,
    });
};

module.exports = sendMail;