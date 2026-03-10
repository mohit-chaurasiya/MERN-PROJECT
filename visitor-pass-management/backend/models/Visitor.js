const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const visitorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {    
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Visitor', visitorSchema);