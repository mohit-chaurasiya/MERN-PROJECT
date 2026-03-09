const express = require('express');
const router = express.Router();

/**
 * Method : GET
 * Route : /admin/login
 * Description : Admin login page
 * Access : Private
 */


router.get('/login', (req, res) => {
    res.send('Admin Login Page');
})

module.exports = router;