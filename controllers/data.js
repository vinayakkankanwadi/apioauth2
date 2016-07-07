// --------------------------------
// Packages we require
// --------------------------------
var Data = require('../models/data');

// endpoint /data for POST
exports.postData = function(req,res){
	console.log('POST',req.body.name,req.body.id);
	var da = new Data();
	da.name = req.body.name;
	da.id = req.body.id;
	
	da.save(function(err){
		if(err)
			res.send(err);
		res.json({message:'Data added', data:da })
	});	
};


// endpoint /data for GET
exports.getDatas = function(req,res){
	console.log('GET');
	Data.find(function(err,da){
		if(err)
			res.send(err);
		res.json(da);
	});
};


//var dataRoute = router.route('/data/:id');
// endpoint /data/:id for GET /data/101
exports.getData = function(req,res){
	console.log('Get id',req.params.id);
	Data.find({id:req.params.id},function(err,da){
		if(err)
			res.send(err);
		
		res.json(da);
	});
};

// endpoint /data/:id for PUT
exports.putData = function(req,res){
	console.log('PUT',req.params.id,req.body.newname);

	Data.update({id:req.params.id},{$set: {name:req.body.newname}},function(err){
		//dara.save(function(err){
		if(err)
			res.send(err);
		res.json({message:'data updated',data:req.params.id});
	});
};

// endpoint /data/:id for DELETE
exports.deleteData = function(req,res){
	console.log('DELETE',req.params.id);
	
	Data.remove({id:req.params.id},function(err){
		if(err)
			res.send(err);
		res.json({message:'data removed'});
	});
};
