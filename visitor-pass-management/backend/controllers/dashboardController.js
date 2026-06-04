const Visitor = require("../models/Visitor")
const Pass = require("../models/Pass")
const Appointment = require("../models/Appointment")
const CheckLog = require("../models/CheckLog")
const User = require("../models/User")


exports.getDashboardStats = async (req, res) => {

  try {

    const totalEmployee = await User.countDocuments({ role: "employee" })
    const totalSecurity = await User.countDocuments({ role: "security" })
    const totalVisitors = await Visitor.countDocuments()
    const activePasses = await Pass.countDocuments({ stats: "active" })
    const approveAppointments = await Appointment.countDocuments({
      status: "approved"
    })
    const pendingAppointments = await Appointment.countDocuments({
      status: "pending"
    })

    const rejectAppointments = await Appointment.countDocuments({
      status: "rejected"
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayCheckins = await CheckLog.countDocuments({
      checkInTime: { $gte: today }
    })

    const todayCheckout = await CheckLog.countDocuments({
      checkoutTime: { $gte: today }
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

  } catch (error) {

    res.status(400).json({
      error: error.message
    })
  }
}

exports.getEmployeeStats = async (req, res) => {
  try {

    const employeeId = req.user._id

    const totalVisitor = await Visitor.countDocuments({
      hostId: employeeId
    })

    const total = await Appointment.countDocuments({
      hostId: employeeId
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

  } catch (err) {
    error: "Failed to fetch employee stats"
  }
}

exports.getWeeklyStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    let pipeline = [
      {
        $match: {
          checkInTime: { $ne: null }
        }
      },
      {
        $lookup: {
          from: "passes",
          localField: "passId",
          foreignField: "_id",
          as: "passData"
        }
      },
      {
        $unwind: "$passData"
      }
    ];

    // 🔥 MAIN LOGIC
    if (role === "employee") {
      pipeline.push({
        $match: {
          "passData.hostId": userId   // 👈 IMPORTANT
        }
      });
    }

    pipeline.push({
      $group: {
        _id: { $dayOfWeek: "$checkInTime" },
        count: { $sum: 1 }
      }
    });

    const stats = await CheckLog.aggregate(pipeline);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const formatted = days.map((day, index) => {
      const found = stats.find(s => s._id === index + 1);
      return {
        name: day,
        count: found ? found.count : 0
      };
    });

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getSecurityStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayVisitors = await Visitor.countDocuments({
      createdAt: { $gte: today },
    });

    const checkedIn = await CheckLog.countDocuments({
      checkInTime: { $gte: today },
      checkOutTime: null,
    });

    const checkedOut = await CheckLog.countDocuments({
      checkOutTime: { $gte: today },
    });

    const recentActivity = await CheckLog.find()
      .populate({
        path: "passId",
        populate: {
          path: "visitorId",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      todayVisitors,
      checkedIn,
      checkedOut,
      activeVisitors: checkedIn,
      recentActivity,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};