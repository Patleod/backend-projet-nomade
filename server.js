
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');
var jwt = require('express-jwt');
var secretB64 = new Buffer('wNAKaffYXaKJ6bGY_R6tmhKZY8bgxHv3HcXyv62ng3GB3fMs9954cQBTshZFCmaG', "base64");
var jwtCheck = jwt({
  secret: secretB64,
  audience: 'Y76wLooWM3ZCxO8aMUSooQdwpsYUoc4s'
});
var user = require('./user/userRoutes');
var event = require('./event/eventRoutes');
var association = require('./association/associationRoutes');
var port = process.env.PORT || 5000;

// MongoDB configuration
mongoose.connect('mongodb://ng2sam:ng2sam@ds135798.mlab.com:35798/migrant-app', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

app.use(cors());
/*app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next();
});*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/users', user);
app.use('/events', jwtCheck, event);
app.use('/associations', association);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('Example app listening ');
});


