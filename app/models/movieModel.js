const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Genre = require('./genreModel.js');
const Actor = require('./actorModel.js');

const movieSchema = Schema({
	id: Number,
	vote_average: Number,
	title: String,
	poster_path: String,
	overview: String,
	release_date: String,
	genre: [{ type: Number, ref: 'Genre' }],
	cast: [{ type: Schema.Types.ObjectId, ref: 'Actor' }]
});

module.exports = mongoose.model('Movie', movieSchema);