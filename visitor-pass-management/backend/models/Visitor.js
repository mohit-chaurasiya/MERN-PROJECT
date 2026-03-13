const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;



const visitorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {    
        type: String,
        required: true,
    
    },
    phone: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    photo: {
        type: String,
        
    }
},{timestamps: true});


visitorSchema.statics.register = async function(name, email, phone, host, hostId,photo) {
    if(!name){
        throw Error('Please enter name')
    }
    if(!email){
        throw Error("please enter email")
    }

    if(!host){
        throw Error("please enter host")
    }
    if(!phone){
        throw Error("please enter phone")
    }
    if(!hostId){
        throw Error("please enter hostId")
    }
    if(!photo){
        throw Error("please add Photo")
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }

   
    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email already exists');
    }

   

    const visitor = await this.create({
    name,
    email,
    phone,
    host,
    hostId
  });

    return visitor;
}


module.exports = mongoose.model('Visitor', visitorSchema);