import axios from 'axios';

export function getMovies(page = 1, size = 9) {
	return new Promise((resolve, reject) => {
		axios.get('api/movies',
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