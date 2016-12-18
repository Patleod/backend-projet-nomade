var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
	'_id': Schema.ObjectId,
	'name' : String,
	'description' : String,
	'date' : Date,
	'eventType' : Number,
	'organisateur' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'participants' : [{ type : Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('event', eventSchema);
