const express = require('express')
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')
const authorizeRoles = require('../middleware/authorizeRoles')
const { getDashboardStats, getEmployeeStats, getWeeklyStats, getSecurityStats, } = require('../controllers/dashboardController')

router.use(requireAuth)


router.get("/stats", authorizeRoles("admin"), getDashboardStats)
router.get('/employee', authorizeRoles("employee"), getEmployeeStats);
router.get("/weekly", requireAuth, getWeeklyStats);
router.get("/security", authorizeRoles("security"), getSecurityStats);

module.exports = router