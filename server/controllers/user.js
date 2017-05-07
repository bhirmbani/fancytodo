const User = require('../models/user');
const passport = require('passport');
const methods = {};

methods.getLatestLogin = (req, res, next) => {
  User.findOne({}, {}, { sort: { 'facebook.createdAt': -1 }}, (err, data) => {
    res.send(data);
})
}


module.exports = methods;