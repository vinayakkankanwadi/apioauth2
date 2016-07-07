// --------------------------------
// Packages we require
// --------------------------------
var mongoose = require('mongoose');

// Define Data schema
var DataSchema = new mongoose.Schema({
	id: Number,
	name: String
});

//Export the mongoose model
module.exports = mongoose.model('Data',DataSchema);