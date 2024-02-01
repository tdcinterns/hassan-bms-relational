// routes/bookStatusRoutes.js
// ... (other imports)

const express = require('express');
const router = express.Router();
const bookStatusController = require('../controllers/bookStatusController');
const { isAuthenticated } = require('../middleware/authMiddleware'); // Add this line

// Apply the isAuthenticated middleware to protect these routes
router.use(isAuthenticated);

router.post('/:bookId', bookStatusController.updateBookStatus);

module.exports = router;
