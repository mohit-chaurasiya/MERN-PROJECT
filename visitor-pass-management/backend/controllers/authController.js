const User = require('../models/User');
const jwt =  require('jsonwebtoken');


// generate JWT token

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'});
}

// register usere

exports.registerUser = async (req, res) => {
    const {name , email, password, role} = req.body;
    try {

        const user = await User.register(name, email, password, role);

        res.status(201).json({
            message: "User registered successfully",
            user
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}


// login user

exports.loginUser = async (req, res) => {
    const {email , password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({
            email: user.email,
            name: user.name,
            token,
            role: user.role
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

}