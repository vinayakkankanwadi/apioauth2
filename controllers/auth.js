// --------------------------------
// Packages we require
// --------------------------------
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');

passport.use(new BasicStrategy(
	function(username,password,callback){
		console.log('Pass',username,password);
		User.findOne({ username: username }, function(err, user) {			
			if (err) {return callback(err);}
			
			//No User with username
			if(!user){ return callback(null,false);}
			
			//Make sure the password is correct
			console.log('passss',password,user.password);
			user.verifyPassword(password,user.password,function(err,isMatch){
				if(err) {return callback(err);}
				
				// Password did not match
				if(!isMatch){ return callback(null,false);}
				
				//Success
				return callback(null,user);
			});
		});
	}
));

passport.use('client-basic',new BasicStrategy(
	function(username,password,callback) {
		Client.findOne({id: username},function(err,client){
			if(err) {return callback(err);}
			//No Client or Bad secret
			if(!client || client.secret!=password) {return callback(null,false);}
			console.log('client-basic',username,password,client);
			//Success
			return callback(null,client);
		});
	}
));

passport.use(new BearerStrategy(
  function(accessToken, callback) {
    Token.findOne({value: accessToken }, function (err, token) {
      if (err) { return callback(err); }

      // No token found
      if (!token) { return callback(null, false); }

      User.findOne({ _id: token.userId }, function (err, user) {
        if (err) { return callback(err); }

        // No user found
        if (!user) { return callback(null, false); }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      });
    });
  }
));

//exports.isAuthenticated = passport.authenticate('basic',{session:false});
exports.isClientAuthenticated = passport.authenticate('client-basic',{session:false});
//exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session : false });