const mongoose = require('mongoose')
const Schema = mongoose.Schema

let todoSchema = new Schema({
  title: {
      type: String
  },
  content: {
      type: String
  },
  status: {
    type: Boolean
  },
  message: {
    type: String
  },
  dueDate: {
    type: Date
  }
}, {timestamps: true})

let Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;