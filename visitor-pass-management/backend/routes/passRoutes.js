const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const authorizeRoles = require('../middleware/authorizeRoles');

const { generatePass } = require('../controllers/passController');

router.use(requireAuth);

router.post('/', authorizeRoles("security"), generatePass);

module.exports = router;