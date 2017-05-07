const FacebookAuth = require('../models/fbAuth');
const User = require('../models/user');
const methods = {};
let latestUser = {};


methods.getLatestUser = (req, res, next) => {
  User.findOne({}, {}, { sort: { 'facebook.createdAt': -1 }}, (err, data) => {
    // res.json({ success: true, user: data })
    res.send(data)
})
}

methods.getLogOutLink = (req, res, next) => {
  User.findOne({}, {}, { sort: { 'facebook.createdAt': -1 }}, (err, data) => {
    latestUser = data;
    let logOutLink = `https://graph.facebook.com/${latestUser.facebook.id}/permissions?access_token=${latestUser.facebook.token}`
    res.send(logOutLink)
  })
}


module.exports = methods;