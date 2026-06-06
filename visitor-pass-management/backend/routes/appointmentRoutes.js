const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const authorizeRoles = require('../middleware/authorizeRoles');

const { createAppointment, getAppointments, approveAppointment, rejectAppointment, deleteAppointment } = require('../controllers/appointmentController');



// protect all routes
router.use(requireAuth);

// employee routes
router.post('/', authorizeRoles("employee"), createAppointment);
router.get('/', authorizeRoles("employee", "admin"), getAppointments);



router.patch('/:id/approve', authorizeRoles("employee", "admin"), approveAppointment);
router.patch('/:id/reject', authorizeRoles("employee", "admin"), rejectAppointment);

router.delete('/:id', authorizeRoles("employee", "admin"), deleteAppointment)

module.exports = router;