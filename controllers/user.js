// --------------------------------
// Packages we require
// --------------------------------
var User = require('../models/user');

// endpoint /user for POST
exports.postUsers = function(req,res){
	console.log('User',req.body.username,req.body.password)
	var user = new User ({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err){
		if(err)
			res.send(err);
		
		res.json({message:'New User added'});
	});	
};

// endpoint /isers for GET
exports.getUsers = function(req,res){
	User.find(function(err,user){
		if(err)
			res.send(err);
		res.json(user);
	});
};