const express = require('express');

const { registerUser,
    loginUser,
    sendOtp,
    verifyOtp,
    forgotPassword,
    resetPassword, } = require('../controllers/authController');


const router = express.Router();

// Register user

/**
 * Method : POST
 * Route : /api/auth/register
 * Description : Register a new user
 * Access : Public
 */

router.post('/register', registerUser);

// Register user

/**
 * Method : POST
 * Route : /api/auth/login
 * Description : Register a new user
 * Access : Public
 */

router.post('/login', loginUser);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;