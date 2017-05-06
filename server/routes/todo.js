const express = require('express');
const router = express.Router();
const todo = require('../controllers/todo');

router.post('/create', todo.create);
router.get('/', todo.getAll);

module.exports = router;