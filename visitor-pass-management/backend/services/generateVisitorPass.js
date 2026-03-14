const PDFDocument = require("pdfkit")
const QRCode = require("qrcode")
const path = require("path")

const generateVisitorPass = async (pass)=>{

    return new Promise(async (resolve) => {
        
        const doc = new PDFDocument({size: "A6", margin: 20})

        const buffers = []

        doc.on("data", buffers.push.bind(buffers))

        doc.on("end",()=>{
            const pdfData = Buffer.concat(buffers)
            resolve(pdfData)
        })

        const hostName = pass.appointmentId.hostId.name
        const purpose = pass.appointmentId.purpose
        const appointmentDate = new Date(pass.appointmentId.date).toLocaleDateString()


        // border

        doc.rect(10,10,doc.page.width-20,doc.page.height -20).stroke()

        doc.fontSize(16).text("Company Logo",20,20)
        doc.fontSize(10).fillColor("gray").text("Visitor Management System",20,40)

        const qrImage = await QRCode.toDataURL(pass.passNumber)
        doc.image(qrImage,doc.page.width-100,20,{width:80})

        console.log(pass.visitorId.photo)
        if(pass.visitorId.photo){
        const photoPath = path.join(__dirname,"..",pass.visitorId.photo)
        
        doc.circle(50,110,30).clip()
        doc.image(photoPath,20,80,{
            width: 60,
            height: 60
        })   
    }

     doc.moveDown(3)

    // Pass Title
    doc.fontSize(14)
       .fillColor("#000")
       .text("VISITOR PASS", { align: "center" })

    doc.moveDown()

    // Pass Number Highlight
    doc.fontSize(12)
       .fillColor("blue")
       .text(`Pass No: ${pass.passNumber}`, { align: "center" })

    doc.moveDown(2)

    // Visitor Details
    doc.fillColor("#000")
    doc.fontSize(11)

    doc.text(`Visitor Name         : ${pass.visitorId.name}`)
    doc.text(`Host Name            : ${hostName}`)
    doc.text(`Purpose              : ${purpose}`)
    doc.text(`Date of Appointment  : ${appointmentDate}`)

    doc.moveDown()

    doc.text(`Valid From : ${pass.validFrom.toLocaleString()}`)
    doc.text(`Valid Till  : ${pass.validTill.toLocaleString()}`)

    doc.moveDown(2)

    // Footer
    doc.fontSize(9)
       .fillColor("gray")
       .text("Please wear this pass visibly during your visit.", {
           align: "center"
       })

    doc.end()

    })
}

module.exports = generateVisitorPass