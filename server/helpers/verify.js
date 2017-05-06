const jwt = require('jsonwebtoken');
const methods = {};

methods.auth = (data) => {
  let token = jwt.sign(data, process.env.SECRET_KEYS, {expiresIn: '3h'});
  return token
}

module.exports = methods;