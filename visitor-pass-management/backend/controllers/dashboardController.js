const Visitor = require("../models/Visitor")
const Pass = require("../models/Pass")
const Appointment = require("../models/Appointment")
const CheckLog = require("../models/CheckLog")
const User = require("../models/User")


exports.getDashboardStats = async (req, res) => {

    try{

        const totalEmployee = await User.countDocuments({role: "employee"})
        const totalSecurity = await User.countDocuments({role: "security"})
        const totalVisitors = await Visitor.countDocuments()
        const activePasses = await Pass.countDocuments({stats: "active"})
        const approveAppointments = await Appointment.countDocuments({
            status : "approved"
        })
        const pendingAppointments = await Appointment.countDocuments({
            status : "pending"
        })
        
        const rejectAppointments = await Appointment.countDocuments({
            status : "rejected"
        })

        const today = new Date()
        today.setHours(0,0,0,0)

        const todayCheckins = await CheckLog.countDocuments({
            checkInTime : { $gte : today}
        })

        const todayCheckout = await CheckLog.countDocuments({
            checkoutTime : { $gte : today}
        })

        res.status(200).json({
            totalEmployee,
            totalSecurity,
            totalVisitors,
            activePasses,
            approveAppointments,
            pendingAppointments,
            rejectAppointments,
            todayCheckins,
            todayCheckout
        })

    }catch(error){
            
        res.status(400).json({
            error: error.message
        })
    }
}

exports.getEmployeeStats = async (req, res)=>{
    try{
        
        const employeeId = req.user._id

        const totalVisitor = await Visitor.countDocuments({
            hostId: employeeId
        })

        const total = await Appointment.countDocuments({
            hostId : employeeId
        })

        const pending = await Appointment.countDocuments({
            hostId: employeeId,
            status: "pending"
        })

        const approved = await Appointment.countDocuments({
            hostId: employeeId,
            status: "approved"
        })

        const rejected = await Appointment.countDocuments({
            hostId: employeeId,
            status: "rejected"
        })

        res.status(200).json({
            totalVisitor,
            total,
            pending,
            approved,
            rejected
        })

    }catch (err){
        error: "Failed to fetch employee stats"
    }
}