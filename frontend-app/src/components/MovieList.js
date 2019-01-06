import React from 'react';
import { Link } from 'react-router-dom'
import styles from './MovieList.module.css';

const MovieList = (props) => {
	function mapMovies() {
		let movies = props.data.map((item) => {
			return (
				<div className="col-md-4" key={item._id}>
		          <div className="card mb-4 shadow-sm">
		          	<Link to={"movie/" + item._id}>
		          		<img src={"https://image.tmdb.org/t/p/w500" + item.poster_path} className={"card-img-top " + styles.cardImage} alt="..." />
		          	</Link>
		            <div className="card-body">
		              <h5 className="card-title">{item.title}</h5>
		              <p className={"card-text " + styles.movieOverview}>{item.overview}</p>
		              <div className="d-flex justify-content-between align-items-center">
		                <div className="btn-group">
		                	<Link to={"movie/" + item._id}>
		                  		<button type="button" className="btn btn-sm btn-info">View</button>
		                  	</Link>
		                </div>
		                <small className="text-muted">{item.vote_average}</small>
		                <small className="text-muted">{item.release_date}</small>
		              </div>
		            </div>
		          </div>
		        </div>
				)
		});

		return movies;
	}
	return (
		<div className='container mt-3'>
			<div className='row'>
				{props.data !== null && 
					mapMovies()
				}
			</div>
		</div>
		);
}

export default MovieList;