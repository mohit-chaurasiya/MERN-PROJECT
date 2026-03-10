const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

const { createAppointment } = require('../controllers/appointmentController')

router.use(requireAuth);

router.post('/', createAppointment);

module.exports = router;