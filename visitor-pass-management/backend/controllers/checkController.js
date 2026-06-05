const Pass = require("../models/Pass")
const CheckLog = require("../models/CheckLog");


// check in visitor

exports.checkInVisitor = async (req, res) => {

    const { passNumber } = req.body;



    try {
        const pass = await Pass.findOne({ passNumber }).populate({
            path: "visitorId",
            select: "name"
        })
            .populate({
                path: "appointmentId",
                populate: [
                    { path: "hostId", select: "name" },
                    { path: "visitorId", select: "name" }
                ]
            })

        if (!pass) {
            return res.status(404).json({
                error: "Invalid Pass"
            })
        }

        if (pass.status === "expired") {
            return res.status(400).json({
                error: "Pass already used and expired"
            });
        }


        const today = new Date().toDateString()
        const appointmentDate = new Date(pass.appointmentId.date).toDateString()

        if (today !== appointmentDate) {
            return res.status(400).json({
                message: "Appointment is not scheduled for today"
            })
        }

        const exisitingLog = await CheckLog.findOne({
            passId: pass._id,
            checkOutTime: null
        });

        if (exisitingLog) {
            return res.status(400).json({
                message: 'Visitor already checked in'
            })
        }

        const usedPass = await CheckLog.findOne({
            passId: pass._id,
            checkOutTime: { $ne: null }
        });

        if (usedPass) {
            return res.status(400).json({
                error: "Pass already used"
            });
        }

        const log = await CheckLog.create({
            passId: pass._id,
            checkInTime: new Date(),
            scannedBy: req.user._id
        })

        res.status(200).json({
            message: "Visitor Checked In",
            visitorName: pass.appointmentId.visitorId.name,
            hostName: pass.appointmentId.hostId.name,
            purpose: pass.appointmentId.purpose,
            date: pass.appointmentId.date,
            passNumber: pass.passNumber,
            log
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// checkout visitor

exports.checkOutVisitor = async (req, res) => {

    const { passNumber } = req.body;

    try {
        const pass = await Pass.findOne({ passNumber })
            .populate({
                path: "appointmentId",
                populate: [
                    { path: "visitorId", select: "name" },
                    { path: "hostId", select: "name" }
                ]
            })

        if (!pass) {
            return res.status(404).json({
                error: "Invalid Pass"
            })
        }

        const log = await CheckLog.findOne({
            passId: pass._id,
            checkOutTime: null
        })

        if (!log) {
            return res.status(404).json({
                error: "Check-in record not found"
            })
        }

        if (log.checkOutTime) {
            return res.status(404).json({
                error: "Visitor already checked out"
            })
        }

        log.checkOutTime = new Date()

        await log.save()

        pass.status = "expired";

        await pass.save();

        res.status(200).json({
            message: "Visitor checked out",
            visitorName: pass.appointmentId.visitorId.name,
            hostName: pass.appointmentId.hostId.name,
            purpose: pass.appointmentId.purpose,
            date: pass.createdAt,
            log
        })
    }
    catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

// pass details

exports.getPassDetails = async (req, res) => {
    const { passNumber } = req.params;

    try {
        const pass = await Pass.findOne({ passNumber }).populate("visitorId")
            .populate({
                path: "appointmentId",
                populate: {
                    path: "hostId",
                    select: "name"
                }
            });

        if (!pass) {
            return res.status(404).json({
                message: "Invalid pass"
            })
        }

        const log = await CheckLog.findOne({ passId: pass._id }).sort({ createdAt: -1 })

        let status = "pending"

        if (log && log.checkInTime && !log.checkOutTime) {
            status = "check-in"
        }

        if (log && log.checkOutTime) {
            status = "checked-out"
        }

        res.json({
            visitorName: pass.visitorId.name,
            hostName: pass.appointmentId.hostId.name,
            purpose: pass.appointmentId.purpose,
            date: pass.appointmentId.date,
            passNumber: pass.passNumber,
            status
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        })
    }
}

exports.getVisitorLogs = async (req, res) => {
    try {

        const { from, to } = req.query;

        let filter = {};

        // Security guard sirf apne logs dekhe
        if (req.user.role === "security") {
            filter.scannedBy = req.user._id;
        }

        // Date filter
        if (from && to) {
            filter.checkInTime = {
                $gte: new Date(from),
                $lte: new Date(to)
            };
        }

        const logs = await CheckLog.find(filter)
            .populate({
                path: "passId",
                populate: [
                    {
                        path: "visitorId",
                        select: "name"
                    },
                    {
                        path: "appointmentId",
                        populate: {
                            path: "hostId",
                            select: "name"
                        }
                    }
                ]
            })
            .populate("scannedBy", "name")
            .sort({ createdAt: -1 });

        const formattedLogs = logs.map(log => ({
            id: log._id,
            visitorName: log.passId?.visitorId?.name || "N/A",
            hostName: log.passId?.appointmentId?.hostId?.name || "N/A",
            purpose: log.passId?.appointmentId?.purpose || "N/A",
            checkIn: log.checkInTime,
            checkOut: log.checkOutTime || null,
            scannedBy: log.scannedBy?.name || "security"
        }));

        res.status(200).json(formattedLogs);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        });
    }
};