const express = require('express')
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')
const authorizeRoles = require('../middleware/authorizeRoles')
const { getDashboardStats } = require('../controllers/dashboardController')

router.use(requireAuth)

router.get("/stats",authorizeRoles("admin"), getDashboardStats)

module.exports = router