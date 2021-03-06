const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Genre = require('./genreModel.js');
const Actor = require('./actorModel.js');

const movieSchema = Schema({
	tmdbId: Number,
	vote_average: Number,
	title: String,
	poster_path: String,
	overview: String,
	release_date: String,
	genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
	cast: [{ type: Schema.Types.ObjectId, ref: 'Actor' }]
});

module.exports = mongoose.model('Movie', movieSchema);