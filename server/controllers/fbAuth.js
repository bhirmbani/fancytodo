const FacebookAuth = require('../models/fbAuth');
const User = require('../models/user');
const methods = {};

methods.logout = (req, res, next) => {
  User.findOne({}, {}, { sort: { 'facebook.createdAt': -1 }}, (err, data) => {
    res.send(data);
})
}

module.exports = methods;