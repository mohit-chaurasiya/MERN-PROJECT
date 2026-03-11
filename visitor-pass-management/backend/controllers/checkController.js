const Pass = require("../models/Pass")
const CheckLog = require("../models/CheckLog");


// check in visitor

exports.checkInVisitor = async (req, res) => {

    const {passNumber} = req.body;

    try {
        const pass = await Pass.findOne({passNumber})

        if(!pass){
            return res.status(404).json({
                error : "Invalid Pass"
            })
        }

        const log = await CheckLog.create({
            passId : pass._id,
            checkInTime: new Date(),
            scannedBy: req.user._id
        })

        res.status(200).json({
            message: "Visitor Checked In",
            log
        })
    } catch (error){
        res.status(400).json({
            error: error.message
        })
    }
}

// checkout visitor

exports.checkOutVisitor = async(req, res) => {
    
    const {passNumber} = req.body;

    try{
        const pass = await Pass.findOne({passNumber})

        const log = await CheckLog.findOne({
            passId : pass._id,
            checkOutTime: null
        })

        if(!log){
            return res.status(404).json({
                error: "Check-in record not found"
            })
        }

        if(log.checkOutTime){
            return res.status(404).json({
                error: "Visitor already checked out"
            })
        }

        log.checkOutTime = new Date()

        await log.save()

        res.status(200).json({
            message: "Visitor checked out",
            log
        })
    }
    catch(error){
        return res.status(400).json({
            error: error.message
        })
    }
}