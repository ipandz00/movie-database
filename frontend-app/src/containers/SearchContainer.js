import React, { Component } from 'react';
import Search from '../components/Search.js';
import { getMovies, getActors } from '../api.js';

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
			if(e.target.value.length > 2) {
				const movies = getMovies(1, 5, null, e.target.value);
				const actors = getActors(5, e.target.value);
				
				Promise.all([movies, actors]).then((responses) => {
					var temp = responses[0].data.map((item) => { return {id: item._id, name: item.title, type: 'movie'}});
					responses[1].data.map((item) => { temp.push({id:item._id, name: item.name, type: 'actor'})});

					this.setState({searchDropdownVisible: true, searchDropdownData: temp});
				})
			}
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