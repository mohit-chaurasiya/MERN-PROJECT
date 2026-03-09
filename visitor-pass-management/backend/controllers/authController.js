const User = require('../models/User');

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