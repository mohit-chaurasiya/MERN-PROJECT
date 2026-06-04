const axios = require("axios");

const sendEmail = async (to, subject, text, pdfBuffer) => {
    try {
        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Visitor Pass Management",
                    email: process.env.SENDER_EMAIL,
                },

                to: [
                    {
                        email: to,
                    },
                ],

                subject: subject,

                htmlContent: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Visitor Pass Management</h2>
            <p>${text}</p>
          </div>
        `,

                attachment: [
                    {
                        name: "visitor-pass.pdf",
                        content: pdfBuffer.toString("base64"),
                    },
                ],
            },
            {
                headers: {
                    accept: "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json",
                },
            }
        );

        console.log("PDF MAIL SENT:", response.data);
        return true;
    } catch (error) {
        console.error(
            "PDF EMAIL ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};

module.exports = sendEmail;