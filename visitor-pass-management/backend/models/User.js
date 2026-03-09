const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'security', 'employee'],
        default: 'employee'
    }
},{timestamps: true});


userSchema.statics.register = async function(name, email, password, role) {
    if(!name || !email || !password || !role){
        throw Error('All fields must be filled');
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough');
    }

    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({name, email, password: hash, role});

    return user;
}

// login method

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error('Incorrect email');
    }   

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}



module.exports = mongoose.model('User', userSchema);