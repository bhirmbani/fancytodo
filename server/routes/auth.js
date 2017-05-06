const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const passport = require('passport')


router.post('/signin', passport.authenticate('local', {
    session: false
}), function(req, res) {
    var user = req.user;
    res.send(user);
});

router.post('/signup', authController.signup)

module.exports = router;