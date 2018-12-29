require('dotenv').config();
const request = require('request');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./app/models/movieModel.js');
const Genre = require('./app/models/genreModel.js');
const Actor = require('./app/models/actorModel.js');

const apiKey = process.env.TMDB_API_KEY;
if(apiKey === undefined) {
	console.log('Please update your .env file with TMDB_API_KEY then restart the script!');
	process.exit(-1);
}

mongoose.connect('mongodb://localhost:27017/imdb', {useNewUrlParser: true});

loadGenres().then((response) => {
	loadMovies().then((news) => {
		console.log('Data has been loaded!');
		process.exit(-1);
	});
});

function loadMovies() {
	var options = { method: 'GET',
	  url: 'https://api.themoviedb.org/3/discover/movie',
	  qs: 
	   {page: 1,
	   include_video: false,
	   include_adult: false,
	   sort_by: 'popularity.desc', 
	   	language: 'en-US',
	     api_key: apiKey },
	  body: '{}' 
	};

	return new Promise((resolve, reject) => {
		request.get(options, (err, response, body) => {
			let data = JSON.parse(body);
			let movieData = [];

			let responses = data.results.map(async (item) => {
				let genre = item.genre_ids.map((item) => item);
				const id = item.id;

				await loadActors(id).then((cast) => {

					const {vote_average, title, poster_path, overview, release_date, genre_ids} = item;
					const subset = {vote_average, title, poster_path, overview, release_date, genre, cast};

					movieData.push(subset);
				});

			});

			Promise.all(responses).then((completed) => {
				Movie.insertMany(movieData, (error, docs) => {
					if(error) {
						reject(error);
					}
					resolve();
				});
			})

			
		});
	});
}

function loadGenres() {
	let startTime = (new Date()).getTime();
	var genreMap = new Map();
	var options = { method: 'GET',
	  url: 'https://api.themoviedb.org/3/genre/movie/list',
	  qs: 
	   { language: 'en-US',
	     api_key: apiKey },
	  body: '{}' 
	};

	return new Promise((resolve, reject) => {
		request(options, (error, response, body) => {
		  if (error) {
		  	throw new Error(error);
		  	reject('Error while getting data from the TMDB.');
		  }

		  let data = JSON.parse(body);

		  for(let i = 0; i < data.genres.length; i++){
			    data.genres[i]._id = data.genres[i]['id'];
			    delete data.genres[i].id;
			}

			Genre.insertMany(data.genres, (error, docs) => {
				if(error) {
					throw new Error(error);
					reject('Error while inserting genres into db.')
				}
				console.log('Genres imported. \n Completed in: ' + ((new Date()).getTime() - startTime)/1000 + ' seconds.');
				resolve();
			});
		});
	});
}

function loadActors( movieId ) {
	var options = { method: 'GET',
	  url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
	  qs: { api_key: apiKey },
	  body: '{}' 
	};

	return new Promise((resolve, reject) => {
		request(options, function (error, response, body) {
		  if (error) {
		  	throw new Error(error);
		  }
		  let data = JSON.parse(body);
		  let cast = [];

		  for(let i = 0; i < 10; i++) {
		  	let el = data.cast[i];
		  	let actor = {
		  		id: el.id,
				name: el.name,
				gender: el.gender,
				order: el.order,
				character: el.character,
				profile_path: el.profile_path
		  	};
		  	cast.push(actor);
		  }

		  Actor.insertMany(cast, (error, docs) => {
		  	resolve(docs.map(item => item._id));
		  });

		});
	});
} 