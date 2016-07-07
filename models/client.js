// --------------------------------
// Packages we require
// --------------------------------
var mongoose = require('mongoose');

// Client Schema

var ClientSchema = new mongoose.Schema({
	name:{type: String, unique: true, required: true},
	id:{type: String, required: true},
	secret:{type: String, required:true},
	userId:{type: String, required: true}
});


//Export the mongoose model
module.exports = mongoose.model('Client',ClientSchema);