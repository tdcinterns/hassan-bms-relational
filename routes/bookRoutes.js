// routes/bookRoutes.js
// ... (other imports)

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { isAuthenticated } = require('../middleware/authMiddleware'); // Add this line

// Apply the isAuthenticated middleware to protect these routes
router.use(isAuthenticated);

router.get('/', bookController.getAllBooks);
router.get('/:bookId', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);

module.exports = router;
