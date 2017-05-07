const express = require('express');
const router = express.Router();
const auth = require('../helpers/verify');
const todo = require('../controllers/todo');

router.post('/create', auth.isLogin, todo.create);
router.get('/', auth.isLogin, todo.getAll);

// complete
router.put('/complete/:id', auth.isLogin, todo.complete);
router.put('/uncomplete/:id', auth.isLogin, todo.uncomplete);

// edit
router.put('/edit/:id', auth.isLogin, todo.edit);

module.exports = router;