// routes/authorContactRoutes.js

const express = require('express');
const router = express.Router();
const authorContactController = require('../controllers/authorContactController');
const { isAuthenticated } = require('../middleware/authMiddleware'); // Add this line

// Apply the isAuthenticated middleware to protect these routes
router.use(isAuthenticated);

router.get('/', authorContactController.getAllAuthorContacts);
router.get('/:contactId', authorContactController.getAuthorContactById);
router.post('/', authorContactController.createAuthorContact);
router.put('/:contactId', authorContactController.updateAuthorContact);
router.delete('/:contactId', authorContactController.deleteAuthorContact);

module.exports = router;
