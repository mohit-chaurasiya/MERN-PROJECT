const express = require('express')
const router = express.Router()

const requireAuth = require("../middleware/requireAuth")
const authorizeRoles = require("../middleware/authorizeRoles")
const { checkInVisitor, checkOutVisitor, getPassDetails, getVisitorLogs } = require('../controllers/checkController')


router.use(requireAuth)

/**
 * Method : POST
 * Route : /check/checkin
 * Description : Create a checkIn visitor
 * Access : Security
 */
router.post("/checkin", authorizeRoles("security"),checkInVisitor)

/**
 * Method : POST
 * Route : /check/checkout
 * Description : Create a checkOut visitor
 * Access : Security
 */
router.post("/checkout", authorizeRoles("security"), checkOutVisitor)


router.get("/pass/:passNumber",authorizeRoles("security"), getPassDetails)
router.get("/logs",authorizeRoles("security"), getVisitorLogs)

module.exports = router