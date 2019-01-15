import React, { Component } from 'react';
import Movie from '../components/Movie.js';
import { getMovieDetails } from '../api.js';

export default class MovieContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			vote_average: null
		}
	}

	componentDidMount() {
		getMovieDetails(this.props.data.tmdbId).then((response) => this.setState({vote_average: response.data.vote_average}));
	}

	render() {
		return (
			<Movie
				data={this.props.data}
				vote={this.state.vote_average}
			/>
			);
	}
}