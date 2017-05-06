const express = require('express');
const router = express.Router();
const auth = require('../helpers/verify');
const todo = require('../controllers/todo');

router.post('/create', todo.create);
router.get('/', auth.isLogin, todo.getAll);

module.exports = router;