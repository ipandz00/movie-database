const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var actorSchema = Schema ({
	tmdbId: Number,
	name: String,
	gender: Number,
	profile_path: String
});

module.exports = mongoose.model('Actor', actorSchema);