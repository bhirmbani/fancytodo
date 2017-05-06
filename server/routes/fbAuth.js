const express = require('express');
const router = express.Router();
const passport = require('passport');
const fbAuth = require('../controllers/fbAuth');

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: 'http://127.0.0.1:8080/',
  failureRedirect: 'http://127.0.0.1:8080/'
}))

module.exports = router;