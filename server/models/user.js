const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
      type: String
  },
  username: {
      type: String
  },
  password: {
      type: String
  },
  role: {
      type: String
  }
})

let User = mongoose.model('User', userSchema);

module.exports = User;