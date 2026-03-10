const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

const { createAppointment, getAppointments, approveAppointment, rejectAppointment } = require('../controllers/appointmentController')


router.use(requireAuth);

router.post('/', createAppointment);
router.get('/', getAppointments);

router.patch('/:id/approve',  approveAppointment);
router.patch('/:id/reject',  rejectAppointment);

module.exports = router;