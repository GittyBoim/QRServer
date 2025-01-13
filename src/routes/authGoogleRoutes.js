const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/dashboard'); // link to the home page after login
  }
);

router.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  res.send(`
    <h1>Wellcom, ${req.user.displayName}!</h1>
    <p>Email: ${req.user.emails[0].value}</p>
    <a href="/auth/logout">Logout</a>
  `);
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
