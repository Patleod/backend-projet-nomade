
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var user = require('./user/userRoutes');
var event = require('./event/eventRoutes');

// MongoDB configuration
mongoose.connect('mongodb://ng2sam:ng2sam@ds135798.mlab.com:35798/migrant-app', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
  next();
});

app.use('/users', user);

app.use('/events', event);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

