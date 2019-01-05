const Movie = require('../models/movieModel.js');
 
// FETCH all Movies
exports.findAll = (req, res) => {
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);

    Movie.find().skip(size * (page - 1)).limit(size).sort({ vote_average: 'desc' }).populate('genre').populate('cast')
    .then(movies => {
        Movie.countDocuments({}).exec((err, count) => {
            if (err) {
                res.send(err);
                return
            }

            let output = {page: page, size: size, data: movies, totalCount: count};
            res.json(output);

        });
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
        res.json(movie);
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