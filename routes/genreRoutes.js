// routes/genreRoutes.js
// ... (other imports)

const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const { isAuthenticated } = require('../middleware/authMiddleware'); // Add this line

// Apply the isAuthenticated middleware to protect these routes
router.use(isAuthenticated);

router.get('/', genreController.getAllGenres);
router.get('/:genreId', genreController.getGenreById);
router.post('/', genreController.createGenre);
router.put('/:genreId', genreController.updateGenre);
router.delete('/:genreId', genreController.deleteGenre);

module.exports = router;
