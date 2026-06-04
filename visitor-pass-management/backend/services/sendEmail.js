const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("SMTP Ready");
    }
});

const sendMail = async (email, otp) => {
    await transporter.sendMail({
        from: `"Visitor Pass Management" <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "OTP Verification",

        html: `
      <h2>Visitor Pass Management</h2>

      <p>Your OTP is:</p>

      <h1>${otp}</h1>

      <p>Valid for 5 minutes.</p>
    `,
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP Verification",
        html: `
    <h2>Visitor Pass Management</h2>
    <h1>${otp}</h1>
  `,
    });

    console.log("MAIL SENT:", info.messageId);
};



module.exports = sendMail;