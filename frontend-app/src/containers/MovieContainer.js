import React, { Component } from 'react';
import Movie from '../components/Movie.js';

export default class MovieContainer extends Component {
	render() {
		return (
			<Movie
				data={this.props.data}
			/>
			);
	}
}