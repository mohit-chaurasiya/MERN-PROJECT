const express = require('express')
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')
const authorizeRoles = require('../middleware/authorizeRoles')
const { getDashboardStats, getEmployeeStats } = require('../controllers/dashboardController')


router.use(requireAuth)


router.get("/stats",authorizeRoles("admin"), getDashboardStats)
router.get('/employee', authorizeRoles("employee"), getEmployeeStats);

module.exports = router