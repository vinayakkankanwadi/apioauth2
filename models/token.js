// --------------------------------
// Packages we require
// --------------------------------
var mongoose = require('mongoose');

// Token Schema
var TokenSchema = new mongoose.Schema({
	value:{type: String, required: true},
	userId:{type: String, required: true},
	clientId:{type: String, required: true}
});

//Export the mongoose model
module.exports = mongoose.model('Token',TokenSchema);