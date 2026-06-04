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
    const info = await transporter.sendMail({
        from: `"Visitor Pass Management" <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "OTP Verification",

        html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
            <h2>Visitor Pass Management</h2>

            <p>Your OTP is:</p>

            <h1 style="letter-spacing:5px">${otp}</h1>

            <p>This OTP is valid for 5 minutes.</p>

            <p>This is system generated email . Please do not reply</p>
        </div>
        `,
    });

    console.log("MAIL SENT:", info.messageId);
};




module.exports = sendMail;