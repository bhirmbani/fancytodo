const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fancytodo');

// passport
const authController = require('./controllers/auth');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use(new Strategy(authController.signin));

// routes
const todos = require('./routes/todo');
const users = require('./routes/user');
const auth = require('./routes/auth');
const fb = require('./routes/fbAuth');

app.set('port', process.env.PORT || 4000);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
    next()
})

app.use(passport.initialize());

// use the routes
app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/', fb)
app.use('/', auth);


app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

module.exports = app;