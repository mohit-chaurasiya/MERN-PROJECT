const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

const { createAppointment, getAppointments } = require('../controllers/appointmentController')



router.use(requireAuth);

router.post('/', createAppointment);
router.get('/', getAppointments);

module.exports = router;