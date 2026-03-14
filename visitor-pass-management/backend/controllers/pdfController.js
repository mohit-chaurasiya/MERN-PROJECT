const PDFDocument = require("pdfkit")
const Pass = require("../models/Pass")
const QRCode = require("qrcode")
const generateVisitorPass = require("../services/generateVisitorPass")

exports.generateVisitorBadge = async (req, res) => {

    const { passNumber } = req.params

    const pass = await Pass.findOne({ passNumber })
        .populate("visitorId")
        .populate({
            path: "appointmentId",
            populate: {
                path: "hostId",
                select: "name"
            }
        })

    const pdfBuffer = await generateVisitorPass(pass)


    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", "inline; filename=visitor-pass.pdf")

    res.send(pdfBuffer)
}