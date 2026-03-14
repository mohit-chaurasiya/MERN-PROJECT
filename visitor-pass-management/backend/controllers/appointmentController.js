const Appointment = require('../models/Appointment');

const Pass = require("../models/Pass");
const sendEmail = require('../services/emailService');
const generateVisitorPass = require('../services/generateVisitorPass');
const { generatePass } = require('./passController');
// const sendSMS = require('../services/smsService');
const { createPassForAppointment } = require("../services/passService");

exports.createAppointment = async (req, res) => {
    try {
        const { visitorId, purpose, date } = req.body;
        const appointment = await Appointment.create({
            visitorId,
            hostId: req.user._id,
            purpose,
            date
        });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAppointments = async (req, res) => {
    try {
        const role = req.user.role
        if (role === "admin") {
            const appointments = await Appointment.find().populate('visitorId').populate('hostId');
            return res.status(200).json(appointments);
        }

        const appointments = await Appointment.find({
            hostId: req.user._id
        }).populate("visitorId")
        res.status(200).json({
            appointments
        })


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAppointmentsAssignedByEmployee = async (req, res) => {
    try {
        const employeeId = req.user._id;
        const appointments = await Appointment.find({
            hostId: employeeId
        }).populate("visitorId");
        res.status(200).json(appointments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.approveAppointment = async (req, res) => {

    const { id } = req.params;

    try {

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status: "approved" },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        const existingPass = await Pass.findOne({ appointmentId: id });

        if (existingPass) {
            return res.status(400).json({
                message: "Pass already generated"
            });
        }

        const pass = await createPassForAppointment(
            appointment._id,
            appointment.date,
            appointment.date
        );

        const populatedPass = await Pass.findById(pass._id)
            .populate("visitorId")
            .populate({
                path: "appointmentId",
                populate: {
                    path: "hostId",
                    select: "name"
                }
            });

        const pdfBuffer = await generateVisitorPass(populatedPass);

        try {
            await sendEmail(
                populatedPass.visitorId.email,
                "Visitor Pass Approved",
                `Hello ${populatedPass.visitorId.name},
Your appointment has been approved.
Your visitor pass is attached.`,
                pdfBuffer
            );
        } catch (emailError) {
            console.log("Email failed:", emailError);
        }

        res.status(200).json({
            message: "Appointment approved and pass generated"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};

exports.rejectAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status: 'rejected' },
            { new: true }
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

exports.deleteAppointment = async (req,res) => {
    const {id} = req.params;

    try{

        const appointment = await Appointment.findByIdAndDelete(id)

        if(!appointment){
            return res.status(404).json({
                error: "Appointment not found"
            })
        }

        res.status(200).json({
            message : "Appointment deleted successfully"
        })

    }catch(error){
        res.status(400).json({
            error: error.message
        })
    }
    
}