const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var actorSchema = Schema ({
	id: Number,
	name: String,
	gender: Number,
	order: Number,
	character: String,
	profile_path: String
});

module.exports = mongoose.model('Actor', actorSchema);