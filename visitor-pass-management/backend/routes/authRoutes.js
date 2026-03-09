const express = require('express');

const { registerUser } = require('../controllers/authController');

const router = express.Router();

// Register user

/**
 * Method : POST
 * Route : /auth/register
 * Description : Register a new user
 * Access : Public
 */

router.post('/register', registerUser);

module.exports = router;