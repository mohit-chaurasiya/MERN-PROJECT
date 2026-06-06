const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const authorizeRoles = require('../middleware/authorizeRoles');

const { generatePass, getAllPasses, deletePass } = require('../controllers/passController');
const { generateVisitorBadge } = require('../controllers/pdfController');



router.use(requireAuth);

router.post('/', authorizeRoles("security"), generatePass);
router.get("/:passNumber/badge", generateVisitorBadge);

router.get(
    "/",
    requireAuth,
    authorizeRoles("admin"),
    getAllPasses
);

router.delete(
    "/:id",
    requireAuth,
    authorizeRoles("admin"),
    deletePass
);
module.exports = router;