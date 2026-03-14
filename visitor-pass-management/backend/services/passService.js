const Pass = require("../models/Pass");
const Appointment = require("../models/Appointment");
const QRCode = require("qrcode");

exports.createPassForAppointment = async (appointmentId, validFrom, validTill) => {

    const appointment = await Appointment.findById(appointmentId);

    const validFromDate = new Date(validFrom)

    const validTillDate = new Date(validFromDate)
    validTillDate.setDate(validTillDate.getDate())

    // time
    validTillDate.setHours(17,0,0,0)

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    if (appointment.status !== "approved") {
        throw new Error("Appointment is not approved yet");
    }

    const passNumber = "VP-" + Date.now();

    const qrData = JSON.stringify({
        passNumber,
        appointmentId
    });

    const qrCode = await QRCode.toDataURL(qrData);

    const pass = await Pass.create({
        visitorId: appointment.visitorId,
        appointmentId,
        passNumber,
        qrCode,
        validFrom : validFromDate,
        validTill : validTillDate
    });

    return pass;
};