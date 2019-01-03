import React, { Component } from 'react';
import Header from '../components/Header.js';

export default class HeaderContainer extends Component {
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
			<Header
				handleSearchChange={this.handleSearchChange}
			/>
			);
	}
}