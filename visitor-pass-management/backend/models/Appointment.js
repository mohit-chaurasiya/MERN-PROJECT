const mongoose = require('mongoose');
const { purge } = require('../routes/adminRoutes');

const Schema = mongoose.Schema;

const appointmentSchmea = new Schema({

    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }


},{timestamps: true});

module.exports = mongoose.model('Appointment', appointmentSchmea);