var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var eventSchema = new Schema({
	'_id': Schema.ObjectId,
	'name' : String,
	'description' : String,
	'date' : Date,
	'eventType' : Number,
	'organisateur' : { type: String, ref: 'user' },
	'participants' : [{ type: String, ref: 'user' }],
});

module.exports = mongoose.model('event', eventSchema);
