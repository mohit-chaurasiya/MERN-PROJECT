const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const authorizeRoles = require('../middleware/authorizeRoles');

const { generatePass } = require('../controllers/passController');
const { generateVisitorBadge } = require('../controllers/pdfController');



router.use(requireAuth);

router.post('/', authorizeRoles("security"), generatePass);
router.get("/:passNumber/badge", generateVisitorBadge);
module.exports = router;