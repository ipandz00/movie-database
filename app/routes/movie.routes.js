module.exports = function(app) {
 
    var movie = require('../controllers/movie.controller.js');
 
    // Retrieve all Movies
    app.get('/api/movies', movie.findAll);
 
    // Retrieve a single Movie by Id
    app.get('/api/movies/:movieId', movie.findOne);

    //Retrieve movie details from TMDB
    app.get('/api/movies/details/:movieId', movie.retrieveMovieDataFromAPI);

}