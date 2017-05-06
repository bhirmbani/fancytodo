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
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    createdAt: Date
  }
})

let User = mongoose.model('User', userSchema);

module.exports = User;