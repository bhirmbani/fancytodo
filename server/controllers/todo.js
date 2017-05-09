const Todo = require('../models/todo');
const moment = require('../helpers/date');
const methods = {};

methods.create = (req, res, next) => {
  let title = req.body.title;
  let content = req.body.content;
  let dueDate = new Date();
  let status = false;
  let message = 'pending'
  Todo.create({title: title, content: content, status: status, dueDate: dueDate, message: message }, (err, todo) => {
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
        obj.createdAt = moment.fromNow(val.createdAt);
        obj.updatedAt = moment.fromNow(val.updatedAt);
        obj.timeCreated = moment.hour(val.createdAt);
        obj.timeDueDate = moment.hour(val.dueDate);
        obj.status = val.status;
        obj.message = val.message;
        arr.push(obj);
      })
      res.json({todo: arr, success: true});
    }
  })
}

methods.complete = (req, res, next) => {
  let query = { _id: req.params.id }
  let arr = [];
  Todo.findOneAndUpdate(query, { $set: { status: true, message: 'beres' } }, function(err, todo) {
    // arr.push(todo)
    res.json({todo: todo});
  })
}

methods.uncomplete = (req, res, next) => {
  let query = { _id: req.params.id }
  let arr = [];
  Todo.findOneAndUpdate(query, { $set: { status: false, message: 'pending' } }, function(err, todo) {
    // arr.push(todo)
    res.json({todo: todo});
  })
}

methods.edit = (req, res, next) => {
  let query = { _id: req.params.id }
  let title = req.body.title;
  let content = req.body.content;
  let status = req.body.status;
  Todo.findOneAndUpdate(query, { $set: { title: title, content: content,  status: status } }, function(err, todo) {
    res.send(todo)
  })
}

methods.findById = (req, res, next) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.send(todo);
  })
}

methods.delete = (req, res, next) => {
  let id = req.params.id;
  Todo.findByIdAndRemove(id, (err, done) => {
    if(err) {
      res.json({error: err, success: false});
    } else {
      res.json({done: done, success: true});
    }
  })
}

module.exports = methods;