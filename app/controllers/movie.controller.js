const Movie = require('../models/movieModel.js');
require('dotenv').config();
const request = require('request');
const apiKey = process.env.TMDB_API_KEY;
 
// FETCH all Movies
exports.findAll = (req, res) => {
    let page = parseInt(req.query.page);
    let size = parseInt(req.query.size);
    let query = {};

    if(req.query.genre) {
        query.genre = parseInt(req.query.genre);
    }

    if(req.query.search) {
       query.title = new RegExp(req.query.search, 'i');
    }

    if(req.query.actor) {
       query.cast = parseInt(req.query.actor);
    }

    Movie.find(query).skip(size * (page - 1)).limit(size).sort({ vote_average: 'desc' }).populate('genre').populate('cast')
    .then(movies => {
        Movie.countDocuments(query).exec((err, count) => {
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

//Update movie from TMDB
exports.retrieveMovieDataFromAPI = (req, res) => {

    var options = { method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${req.params.movieId}`,
      qs: { api_key: apiKey },
      body: '{}' 
    };

    request(options, function (error, response, body) {
          if (error) {
            res.json({error: true, text:'Unable to retrieve details.'});
          }
          let data = JSON.parse(body);

          res.json(data);
        });
}