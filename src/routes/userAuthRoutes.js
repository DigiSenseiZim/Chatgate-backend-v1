const express = require('express');
const passport = require('../config/oAuthConfig');
const router = express.Router();

// Google OAuth Routes
router.get('/auth/google',  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000'); 
    // Redirect after successful login
  }
);

module.exports = router;
