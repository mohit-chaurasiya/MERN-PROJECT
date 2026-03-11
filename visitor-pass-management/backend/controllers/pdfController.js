const PDFDocument = require("pdfkit")
const Pass = require("../models/Pass")
const QRCode = require("qrcode")

exports.generateVisitorBadge = async (req,res)=>{

    const { passNumber } = req.params

    const pass = await Pass.findOne({passNumber}).populate("visitorId")

    if(!pass){
        return res.status(404).json({
            error:"Pass not found"
        })
    }

    const doc = new PDFDocument({size:"A6", margin:20})

    res.setHeader("Content-Type","application/pdf")
    res.setHeader("Content-Disposition","inline; filename=visitor-badge.pdf")

    doc.pipe(res)

    // title
    doc.fontSize(18).text("Visitor Pass",{align:"center"})
    doc.moveDown()

    // visitor details
    doc.fontSize(12).text(`Name: ${pass.visitorId.name}`)
    doc.text(`Pass Number: ${pass.passNumber}`)
    doc.text(`Valid From: ${pass.validFrom}`)
    doc.text(`Valid Till: ${pass.validTill}`)

    doc.moveDown()

    // QR code generate
    const qrData = pass.passNumber
    const qrImage = await QRCode.toDataURL(qrData)

    // add QR to pdf
    doc.image(qrImage,{
        fit:[120,120],
        align:"center"
    })

    doc.end()
}