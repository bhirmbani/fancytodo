const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fancytodo');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));

// routes

// use the routes


app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

module.exports = app;