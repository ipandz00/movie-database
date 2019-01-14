const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var genreSchema = Schema ({
	tmdbId: Number,
	name: String
});

module.exports = mongoose.model('Genre', genreSchema);