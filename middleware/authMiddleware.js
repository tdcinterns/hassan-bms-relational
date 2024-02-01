// middleware/authMiddleware.js

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
      // User is authenticated, proceed to the next middleware or route handler
      return next();
    } else {
      // User is not authenticated, send unauthorized response
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = {
    isAuthenticated,
  };
  