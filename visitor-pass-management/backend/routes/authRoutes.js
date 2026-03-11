const express = require('express');

const { registerUser, loginUser } = require('../controllers/authController');


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

module.exports = router;