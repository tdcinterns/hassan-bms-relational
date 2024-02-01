// routes/authorRoutes.js
// ... (other imports)

const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { isAuthenticated } = require('../middleware/authMiddleware'); // Add this line

// Apply the isAuthenticated middleware to protect these routes
router.use(isAuthenticated);

router.get('/', authorController.getAllAuthors);
router.get('/:authorId', authorController.getAuthorById);
router.post('/', authorController.createAuthor);
router.put('/:authorId', authorController.updateAuthor);
router.delete('/:authorId', authorController.deleteAuthor);

module.exports = router;
