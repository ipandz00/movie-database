const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var actorSchema = Schema ({
	_id: Number,
	name: String,
	gender: Number,
	order: Number,
	profile_path: String
}, { _id: false, autoIndex: false});

module.exports = mongoose.model('Actor', actorSchema);