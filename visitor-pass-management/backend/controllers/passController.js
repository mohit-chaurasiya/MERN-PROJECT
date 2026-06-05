const Pass = require('../models/Pass');
const Appointment = require('../models/Appointment');
const QRCode = require('qrcode');

exports.generatePass = async (req, res) => {

    const { appointmentId, validFrom, validTill } = req.body;

    try {
        const appointment = await Appointment.findById(appointmentId);


        // find appointment

        if (!appointment) {
            return res.status(404).json({
                error: 'Appointment not found'
            })
        }

        // check appointment status

        if (appointment.status != 'approved') {
            return res.status(400).json({
                error: 'Appointment is not approved yet'
            })
        }

        // create unique pass number

        const passNumber = "Pass-" + Date.now();

        // data for QR code

        const qrData = JSON.stringify({
            passNumber,
            appointmentId
        })

        // generate QR code

        const qrCode = await QRCode.toDataURL(qrData);

        // create pass

        const pass = await Pass.create({
            visitorId: appointment.visitorId,
            appointmentId,
            passNumber,
            hostId: appointment.hostId,
            qrCode,
            validFrom,
            validTill
        })

        res.status(201).json(pass);
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}