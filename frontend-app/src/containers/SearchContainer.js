import React, { Component } from 'react';
import Search from '../components/Search.js';

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
		console.log(e.target.value);
	}

	render() {
		return (
			<Search
				handleSearchChange={this.handleSearchChange}
			/>
			);
	}
}