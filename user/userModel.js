var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'_id': Schema.ObjectId,
	'connection' : String,
	'email' : String,
	'password' : String,
	'role' : Array
});

module.exports = mongoose.model('user', userSchema);
