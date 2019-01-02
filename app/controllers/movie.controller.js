const Movie = require('../models/movieModel.js');
 
// FETCH all Movies
exports.findAll = (req, res) => {
    Movie.find().populate('genre').populate('cast')
    .then(movies => {
        res.send(movies);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
 
// FIND a Movie
exports.findOne = (req, res) => {
    Movie.findById(req.params.movieId).populate('genre').populate('cast')
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });            
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Movie with id " + req.params.movieId
        });
    });
};