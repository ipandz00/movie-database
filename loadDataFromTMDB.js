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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

mongoose.connect('mongodb://localhost:27017/imdb', {useNewUrlParser: true});

loadGenres().then((genres) => {
	(async function loop() {
	    for (let i = 1; i <= 5; i++) {
	        await loadMovies(i, genres);
	        await sleep(5000);
	        console.log(i + ' page has been loaded');
	    }
	    console.log('Script finished.');
		process.exit(-1);
	})();
}).catch((err) => {
	throw new Error(err);
});

function loadMovies( page = 1, genres) {
	var options = { method: 'GET',
	  url: 'https://api.themoviedb.org/3/discover/movie',
	  qs: 
	   {page: page,
	   include_video: false,
	   include_adult: false,
	   sort_by: 'popularity.desc', 
	   	language: 'en-US',
	     api_key: apiKey },
	  body: '{}' 
	};

	return new Promise((resolve, reject) => {
		request.get(options, (err, response, body) => {
			if(err !== null) {
				throw new Error(err);
			}
			let data = JSON.parse(body);
			let movieData = [];
			if(data.results === undefined) {
				throw new Error('No results!');
			}

			let responses = data.results.map(async (item) => {
				let genre = item.genre_ids.map((item) => genres[item]);
				const id = item.id;

				await loadActors(id).then((cast) => {
					const {vote_average, title, poster_path, overview, release_date, genre_ids} = item;
					const subset = {tmdbId: item.id, vote_average, title, poster_path, overview, release_date, genre, cast};

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
			    data.genres[i].tmdbId = data.genres[i]['id'];
			    delete data.genres[i].id;
			}

			Genre.insertMany(data.genres, (error, docs) => {
				if(error) {
					throw new Error(error);
					reject('Error while inserting genres into db.')
				}
				console.log('Genres imported. \n Completed in: ' + ((new Date()).getTime() - startTime)/1000 + ' seconds.');

				let data = docs.reduce((obj, item) => {
					obj[item.tmdbId] = item._id;
					return obj;
				}, {});

				resolve(data);
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
		  let dbCast = [];
		  if(data.cast === undefined) {
		  	console.log('Movie with id=' + movieId + ' has no actors!');
		  	resolve(null);
		  }
		  else {
		  	insertActors(data).then((response) => {
		  		resolve(response);
		  	})
		  }

		});
	});
}

function insertActors(data) {
	let cast = [];
	let dbCast = [];
	let max = data.cast.length < 10 ? data.cast.length: 10;
	return new Promise(async (resolve, reject) => {
		for(let i = 0; i < max; i++) {
		  	let el = data.cast[i];
		  	let actor = {
		  		tmdbId: el.id,
				name: el.name,
				gender: el.gender,
				profile_path: el.profile_path
		  	};
		  	await Actor.findOne({tmdbId: el.id}).then((result) => {
		  		if(result) {
		  			console.log('Actor ' + result.name + ' already exists. Using old id...');
		  			dbCast.push(result._id);
		  		}
		  		else {
		  			cast.push(actor);
		  		}
		  	})
		  }

		  await Actor.insertMany(cast, (error, docs) => {
		  	let db = docs.map(item => item._id);
		  	const realData = [...db, ...dbCast];
		  	resolve(realData);
		  });
	});	
} 