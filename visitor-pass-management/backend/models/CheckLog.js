const mongoose = require('mongoose')

const Schema = mongoose.Schema

const checkLogSchema = new Schema({
    
    passId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Pass",
        required : true
    },
    checkInTime: {
        type : Date
    },
    
    checkOutTime : {
        type: Date
    },

    scannedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps : true
})


module.exports = mongoose.model("CheckLog", checkLogSchema)