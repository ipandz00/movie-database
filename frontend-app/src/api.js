import axios from 'axios';
const env = process.env.NODE_ENV || 'development';
var urlPrefix = '';
if(env === 'development') {
	urlPrefix = 'http://localhost:8081/';
}

export function getMovies(page = 1, size = 9) {
	return new Promise((resolve, reject) => {
		axios.get(urlPrefix + 'api/movies',
			{params: {
			    page: page,
			    size: size
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
		axios.get(urlPrefix + 'api/movies/' + id)
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