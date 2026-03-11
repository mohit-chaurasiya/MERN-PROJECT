const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth');
const { createVisitor, getVisitors, getVisitorById, updateVisitor, deleteVisitor, searchVisitors } = require('../controllers/visitorController');



// protect all routes

router.use(requireAuth);

/**
 * Method : POST
 * Route : /api/visitors
 * Description : Create a new visitor
 * Access : Private
 */

router.post('/', createVisitor);

/**
 * Method : GET
 * Route : /api/visitors/
 * Description : get visitor by name , host name, date
 * Parameters : name . host name , date
 * Access : Public
 */ 
router.get("/search", searchVisitors)

/**
 * Method : GET
 * Route : /api/visitors
 * Description : Get all visitors
 * Access : Private
 */

router.get('/', getVisitors); 

/**
 * Method : GET
 * Route : /api/visitors/:id
 * Description : Get a visitor by ID
 * Parameters : id - Visitor ID
 * Access : Private
 */

router.get('/:id', getVisitorById);

/**
 * Method : PATCH
 * Route : /api/visitors/:id
 * Description : Update a visitor by ID
 * Parameters : id - Visitor
 * Access : Private
 */

router.patch('/:id',updateVisitor);

/**
 * Method : DELETE
 * Route : /api/visitors/:id
 * Description : Delete a visitor by ID
 * Parameters : id - Visitor ID
 * Access : Private
 */ 

router.delete('/:id', deleteVisitor);



module.exports = router;