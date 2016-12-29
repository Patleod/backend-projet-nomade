var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'_id': Schema.ObjectId,
	'connection' : String,
	'email' : String,
	'name': String,
	'picture': String,
	'password' : String,
	'role' : Array,
	'pays': String,
	'locale': String,
	'mineur': Boolean,
	'nonAccompagne': Boolean
});

module.exports = mongoose.model('user', userSchema);
