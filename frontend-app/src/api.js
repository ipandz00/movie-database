import axios from 'axios';
const env = process.env.NODE_ENV || 'development';
var urlPrefix = window.location.origin;
if(env === 'development') {
	urlPrefix = 'http://localhost:8081';
}

export function getMovies(page = 1, size = 9, genre, query = '') {
	return new Promise((resolve, reject) => {
		axios.get(urlPrefix + '/api/movies',
			{params: {
			    page: page,
			    size: size,
			    genre: genre,
			    search: query
			  }})
		.then((data) => {
			if(data.status === 200) {
				resolve(data.data);
			}
			else {
				reject(data.statusText);
			}
		})
		.catch((err) => reject(err));
	});
}

export function getMovie(id) {
	return new Promise((resolve, reject) => {
		axios.get(urlPrefix + '/api/movies/' + id)
		.then((data) => {
			if(data.status === 200) {
				resolve(data.data);
			}
			else {
				reject(data.statusText);
			}
		})
		.catch((err) => reject(err));
	});
}

export function getMovieDetails(id) {
	return new Promise((resolve, reject) => {
		axios.get(urlPrefix + '/api/movies/details/' + id)
		.then((data) => {
			if(data.status === 200) {
				resolve(data);
			}
			else {
				reject(data.statusText);
			}
		})
		.catch((err) => reject(err));
	});
}

export function getActors(size = 5, name) {
	return new Promise((resolve, reject) => {
		axios.get(urlPrefix + '/api/actors',
			{params: {
				size: size,
			    name: name
			  }})
		.then((data) => {
			if(data.status === 200) {
				resolve(data);
			}
			else {
				reject(data.statusText);
			}
		})
		.catch((err) => reject(err));
	});
}

