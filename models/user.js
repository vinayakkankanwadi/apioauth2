// --------------------------------
// Packages we require
// --------------------------------
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// User Schema
var UserSchema = new mongoose.Schema({
	username:{
		type: String,
		unique: true,
		require: true
	},
	password:{
		type: String,
		required: true
	}
});

// PRE user save call
UserSchema.pre('save',function(callback){
	var user = this;
	
	// Return if password has not changed?
	if(!user.isModified('password')) return callback();
	
	// Password changed
	bcrypt.genSalt(5,function(err,salt){
		if(err) return callback(err);
		
		bcrypt.hash(user.password,salt,null,function(err,hash){
			if(err) return callback(err);
			
			user.password = hash;
			//user.password = user.password;
			callback();
		});
		
	});
	
});

UserSchema.methods.verifyPassword = function(password,storedPassword,cb){
//UserSchema.verifyPassword = function(password,cb){
	console.log('pass',password,storedPassword);
	bcrypt.compare(password,storedPassword,function(err,isMatch){
		console.log('pass',password,storedPassword,isMatch);
		if(err) return cb(err);
		cb(null,isMatch);
	});
};

//Export the mongoose model
module.exports = mongoose.model('User',UserSchema);
