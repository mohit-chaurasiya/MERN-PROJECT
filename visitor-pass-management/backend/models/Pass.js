const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passSchema = new Schema({

    visitorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Visitor',
        required : true
    },
    appointmentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Appointment',
        required : true 
    },
    passNumber :{
        type: String,
        required : true,
        unique : true
    },
    qrCode : {
        type: String,
        required : true
    },
    validFrom : {
        type: Date,
        required : true

    },
    validTill : {
        type: Date,
        required : true
    },

    status:{
        type: String,
        default : 'active'
    },
    hostId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
},{
    timestamps : true
})

module.exports = mongoose.model('Pass', passSchema);