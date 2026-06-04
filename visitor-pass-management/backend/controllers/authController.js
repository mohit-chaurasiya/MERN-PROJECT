const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Otp = require("../models/Otp");
const sendMail = require("../services/sendEmail");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");


// generate JWT token

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

// register usere

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {

        const user = await User.register(name, email, password, role);

        res.status(201).json({
            message: "User registered successfully",
            user
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


// login user

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

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


// send Otp

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });


        console.log("Generated otp", otp)

        await Otp.deleteMany({ email });

        await Otp.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        await sendMail(email, otp);

        res.status(200).json({
            message: "OTP sent Successfully"
        });
    } catch (error) {
        res.status(500).json({

            error: error.message,
        })
    }

}

// verify otp

exports.verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body

        const record = await Otp.findOne({ email });

        if (!record) {
            return res.status(400).json({
                error: "OTP not found"
            })
        }

        if (record.expiresAt < new Date()) {
            return res.status(400).json({
                error: "OTP expired"
            })
        }

        if (record.otp !== otp) {
            return res.status(400).json({
                error: "Invalid OTP"
            })
        }

        res.status(200).json({
            message: "OTP verified"
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}

// forgot password

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        console.log("Generated otp", otp)

        await Otp.deleteMany({ email });

        await Otp.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        console.log("Before sendMail");
        await sendMail(email, otp);
        console.log("Sending mail to:", email);
        console.log("After sendMail");

        res.status(200).json({
            message: "OTP sent successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};


// reset password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        const record = await Otp.findOne({ email });

        if (!record) {
            return res.status(400).json({
                error: "OTP not found",
            });
        }

        if (record.otp !== otp) {
            return res.status(400).json({
                error: "Invalid OTP",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await User.findOneAndUpdate(
            { email },
            { password: hash }
        );

        await Otp.deleteMany({ email });

        res.status(200).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};