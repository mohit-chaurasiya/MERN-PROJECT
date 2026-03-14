const twilio = require("twilio")

const client = new twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
)

const sendSMS = async (to,message) => {
    await client.message.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        toString
    })
}

module.exports = sendSMS