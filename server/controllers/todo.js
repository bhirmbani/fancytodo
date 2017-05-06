const Todo = require('../models/todo');
const methods = {};

methods.create = (req, res, next) => {
  let title = req.body.title;
  let content = req.body.content;
  Todo.create({title: title, content: content}, (err, todo) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({todo: todo, success: true});
    }
  })
}

module.exports = methods;