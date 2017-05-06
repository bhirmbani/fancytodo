const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fancytodo');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));

// passport
const authController = require('./controllers/auth')
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

passport.use(new Strategy(authController.signin));

// routes
const users = require('./routes/user');
const auth = require('./routes/auth');

// use the routes
app.use('/api/users', users);
app.use('/', auth);


app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

module.exports = app;