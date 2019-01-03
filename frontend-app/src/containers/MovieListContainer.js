import React, { Component } from 'react';
import MovieList from '../components/MovieList.js';

export default class MovieListContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchDropdownVisible: false,
			searchDropdownData: null
		};

		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	handleSearchChange(e) {
		console.log(e.target.value);
	}

	render() {
		return (
			<MovieList
				handleSearchChange={this.handleSearchChange}
				data={this.props.data}
			/>
			);
	}
}