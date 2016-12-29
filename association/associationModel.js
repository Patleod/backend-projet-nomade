var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var associationSchema = new Schema({
	'_id': Schema.ObjectId,
	'name' : String,
	'adress' : String,
	'email' : String,
	'tel' : String,
	'schedule' : String,
	'description' : String,
	'website' : String,
	'valid' : Boolean,
	'members' : [{
	 	type: String,
	 	ref: 'user'
	}],
	'manager' : {
	 	type: String,
	 	ref: 'user'
	},
	'followers' : [{
	 	type: String,
	 	ref: 'user'
	}],
	'pays': String,
	'langue': String,
	'mineur': Boolean,
	'nonAccompagne': Boolean,
});

module.exports = mongoose.model('association', associationSchema);
