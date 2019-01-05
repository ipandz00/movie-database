import React from 'react';
import styles from './Movie.module.css';

function renderGenres(data) {
	let d = data.map((item) => {
		return (
			<a key={item._id} href={"/movies?genre=" + item._id} className="badge badge-info mr-1">{item.name} </a>
			)
	});

	return d;
}

const Movie = (props) => {
	if(props.data !== null) {
		return (
			<div className={styles.backgroundColor}>
				<div className='container pt-5 pb-5'>
					<div className="row">
					  <div className="col-4">
					  	<img src={"https://image.tmdb.org/t/p/w500" + props.data.poster_path} className="img-fluid" alt="Responsive image"/>
					  </div>
					  <div className="col-6">
					  	<h2 className={styles.whiteText}>
						  {props.data.title}
						  <small className="text-muted"> ({props.data.year})</small>
						</h2>
						<p className={'mt-3 ' + styles.whiteText}> Average user score: <b>{props.data.vote_average*10}%</b></p>
						<h4 className={styles.whiteText}>Overview:</h4>
						<p className={styles.whiteText}>{props.data.overview}</p>
						<h5 className={styles.whiteText}>Genres:</h5>
						{renderGenres(props.data.genre)}
					  </div>
					</div>
				</div>
		</div>
		);
	}
	else {
		return <h1>Loading...</h1>;
	}
}

export default Movie;