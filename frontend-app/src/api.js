import axios from 'axios';

export function getMovies() {
	return new Promise((resolve, reject) => {
		axios.get('http://localhost:8081/movies')
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