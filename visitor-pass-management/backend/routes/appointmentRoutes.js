const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const authorizeRoles = require('../middleware/authorizeRoles');

const { createAppointment, getAppointments, approveAppointment, rejectAppointment, deleteAppointment} = require('../controllers/appointmentController');



// protect all routes
router.use(requireAuth);

// employee routes
router.post('/', authorizeRoles("employee"), createAppointment);
router.get('/', authorizeRoles("employee"), getAppointments);



router.patch('/:id/approve', authorizeRoles("employee"), approveAppointment);
router.patch('/:id/reject', authorizeRoles("employee"), rejectAppointment);

router.delete('/:id',authorizeRoles("employee"),deleteAppointment)

module.exports = router;