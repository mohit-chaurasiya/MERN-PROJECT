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
        const pendingAppointments = await Appointment.countDocuments({
            status : "pending"
        })
        const approveAppointments = await Appointment.countDocuments({
            status : "approved"
        })
        const rejectAppointments = await Appointment.countDocuments({
            status : "rejected"
        })

        const today = new Date()
        today.setHours(0,0,0,0)

        const todayCheckins = await CheckLog.countDocuments({
            checkInTime : { $gte : today}
        })

        res.status(200).json({
            totalEmployee,
            totalSecurity,
            totalVisitors,
            activePasses,
            approveAppointments,
            pendingAppointments,
            rejectAppointments,
            todayCheckins
        })

    }catch(error){
            
        res.status(400).json({
            error: error.message
        })
    }
}