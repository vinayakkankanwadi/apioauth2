// --------------------------------
// Packages we require
// --------------------------------
var Client = require('../models/client');

// endpoint /client for POST
exports.postClients = function(req,res){
	var client = new Client();
	
	client.name= req.body.name;
	client.id = req.body.id;
	client.secret = req.body.secret;
	client.userId = req.user._id;
	
	client.save(function(err){
		if(err)
			res.send(err);
		res.json({message: 'client added', data: client});
	});
};

// endpoint /client for GET
exports.getClients = function(req,res){
	console.log('Client',req.user._id,req.user.id);
	client.find({userId:req.user._id},function(err,clients){
		if(err)
			res.send(err);
		res.json(clients);
	});
};