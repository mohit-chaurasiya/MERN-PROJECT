const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const { visitorId, hostId, purpose, date } = req.body;
        const appointment = await Appointment.create({ visitorId, hostId, purpose, date });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('visitorId').populate('hostId');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}