const axios = require("axios");

const sendMail = async (email, otp) => {
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
            email: email,
          },
        ],

        subject: "OTP Verification",

        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding:20px">
            <h2>Visitor Pass Management</h2>

            <p>Your OTP for verification is:</p>

            <h1 style="letter-spacing:5px; color:#6d28d9;">
              ${otp}
            </h1>

            <p>This OTP is valid for 5 minutes.</p>

            <hr>

            <p style="color:gray;">
              If you didn't request this OTP, please ignore this email.
            </p>
          </div>
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("MAIL SENT:", response.data);
    return true;
  } catch (error) {
    console.error(
      "BREVO ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = sendMail;