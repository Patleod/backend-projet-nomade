var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'_id': Schema.ObjectId,
	'connection' : String,
	'email' : String,
	'name': String,
	'img': String,
	'password' : String,
	'role' : Array,
	'pays': String,
	'langue': String,
	'mineur': Boolean,
	'nonAccompagne': Boolean
});

module.exports = mongoose.model('user', userSchema);
