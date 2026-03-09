const User = require('../models/User');

// register usere

exports.registerUser = async (req, res) => {
    try {
        const {name , email, password, role} = req.body;

        // check if user already exits 
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                error: 'User already exists'
            })
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        })

        res.status(201).json({
            message: "User registered successfully",
            user
        })
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}