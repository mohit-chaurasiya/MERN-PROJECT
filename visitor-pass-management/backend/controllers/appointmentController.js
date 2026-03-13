const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const { visitorId, purpose, date } = req.body;
        const appointment = await Appointment.create({ 
             visitorId,
             hostId: req.user._id,
             purpose, 
            date });
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

exports.getAppointmentsAssignedByEmployee = async(req, res) => {
    try{
        const employeeId = req.user._id;
        const appointments = await Appointment.find({
            hostId: employeeId
        }).populate("visitorId");
        res.status(200).json(appointments);
    }catch (error){
        res.status(404).json({message: error.message});
    }
}

exports.approveAppointment = async (req, res) => {

    const { id } = req.params;

    try {
        const appointment = await Appointment.findByIdAndUpdate(
              id,
             { status: 'approved' },
            { new: true })
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.rejectAppointment = async (req, res) => {
    const {id} = req.params;

    try {
        const appointment = await Appointment.findByIdAndUpdate(
            id,
            {status : 'rejected'},
            {new : true}
        )
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({
            message: 'Appointment rejected successfully',
            appointment
        });
    } catch (error) {        
        res.status(400).json({ 
            message: error.message      
        })
    }
}