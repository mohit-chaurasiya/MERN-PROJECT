const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmail = async (to, subject, text, pdfBuffer) => {
    await transporter.sendMail({

        from: process.env.EMAIL_USER,
        to,
        subject,
        text,

        attachments: [
            {
                filename: "visitor-pass.pdf",
                content: pdfBuffer
            }
        ]
    })
}

module.exports = sendEmail