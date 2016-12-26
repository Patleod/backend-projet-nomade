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
	'validate' : Boolean,
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
	}]
});

module.exports = mongoose.model('association', associationSchema);
