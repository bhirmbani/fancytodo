const Todo = require('../models/todo');
const moment = require('../helpers/date');
const methods = {};

methods.create = (req, res, next) => {
  let title = req.body.title;
  let content = req.body.content;
  let status = 'not completed';
  Todo.create({title: title, content: content, status: status}, (err, todo) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({todo: todo, success: true});
    }
  })
}

methods.getAll = (req, res, next) => {
  Todo.find({}, (err, todo) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      let arr = [];
      todo.forEach(function(val) {
        let obj = {};
        obj.id = val._id;
        obj.title = val.title;
        obj.content = val.content;
        obj.createdAt = moment.year(val.createdAt);
        obj.updatedAt = moment.year(val.updatedAt);
        arr.push(obj);
      })
      res.json({todo: arr, success: true});
    }
  })
}

module.exports = methods;