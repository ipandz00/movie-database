import React, { Component } from 'react';
import Search from '../components/Search.js';
import { getMovies } from '../api.js';

export default class SearchContainer extends Component {
	constructor() {
		super();

		this.state = {
			searchDropdownVisible: false,
			searchDropdownData: null
		};

		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	handleSearchChange(e) {
		if(e.target.value === '') {
			this.setState({searchDropdownVisible: false, searchDropdownData: null});
		}
		else {
			getMovies(1, 20, null, e.target.value)
			.then((res) => {
				this.setState({searchDropdownData: res.data, searchDropdownVisible: true})
			});
		}
	}

	render() {
		return (
			<Search
				handleSearchChange={this.handleSearchChange}
				data = {this.state.searchDropdownData}
				visible = {this.state.searchDropdownVisible}
			/>
			);
	}
}