// --------------------------------
// Packages we require
// --------------------------------
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');
var dataController = require('./controllers/data');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');

// --------------------------------
//Connect to data MongoDB
// --------------------------------
mongoose.connect('mongodb://localhost:27017/api')

// Create our Express application
var app = express();

// Set View engine to ejs
app.set('view engine','ejs')

// Create Router
var router = express.Router();

// create endpoint handler for /data
router.route('/data')
	.post(authController.isAuthenticated,dataController.postData)
	.get(authController.isAuthenticated,dataController.getDatas);
	
// create endpoint handler for /data/:id
router.route('/data/:id')
	.get(authController.isAuthenticated,dataController.getData)
	.put(authController.isAuthenticated,dataController.putData)
	.delete(authController.isAuthenticated,dataController.deleteData);

// create endpoint handler for /users
router.route('/user')
	.post(userController.postUsers)
	.get(authController.isAuthenticated,userController.getUsers);	

// create endpoint handler for /client
router.route('/client')
	.post(authController.isAuthenticated,clientController.postClients)
	.get(authController.isAuthenticated,clientController.getClients);
	
// create endpoint handler for oauth2 authorize
router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// create endpoint handler for oauth2 token
router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);
	
// --------------------------------
// Register routers, body-parser
// --------------------------------
// NOTE Order of bodyParser and router matters
app.use(bodyParser.urlencoded({
	extended:true
}));


// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

//Use passport 
app.use(passport.initialize());

app.use('/',router);


// Start the server on the port
var port = 3000;
app.listen(port);
console.log('Listing to Vin on port' + port);