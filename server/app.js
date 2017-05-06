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
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/user');

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  // done(null, obj);
  User.findById(id, (err, user) => {
    done(err, user);
    console.log(user)
  })
});

passport.use(new Strategy(authController.signin));
passport.use(new FacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: 'http://localhost:4000/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({ 'facebook.id': profile.id }, (err, user) => {
      if(err) {
        console.log(err);
      }
      else {
        let newUser = new User();

          newUser.facebook.id = profile.id,
          newUser.facebook.token = accessToken,
          // newUser.facebook.email = profile.emails[0].value,
          newUser.facebook.name = profile.displayName,
          newUser.facebook.createdAt = new Date()

        newUser.save((err) => {
          if(err) {
            console.log(err);
          } else {
            console.log('saving user..');
            done(null, user);
          }
        })
      }
    })
}));

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