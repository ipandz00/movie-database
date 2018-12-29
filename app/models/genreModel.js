const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var genreSchema = Schema ({
	_id: Number,
	name: String
}, { _id: false, autoIndex: false});

module.exports = mongoose.model('Genre', genreSchema);