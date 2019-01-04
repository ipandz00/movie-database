import React, { Component } from 'react';
import Pagination from '../components/Pagination.js';

export default class PaginationContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pageSize: 9,
			currentPage: 1,
			totalCount: 1
		};

		this.handlePaginationClick = this.handlePaginationClick.bind(this);
	}

	componentDidUpdate(prevProps, prevState,) {
		if(JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
			let totalNum = Math.ceil(this.props.totalCount / this.props.pageSize);
			this.setState({pageSize: this.props.pageSize, currentPage: this.props.currentPage, totalCount: totalNum});
		}
	}

	handlePaginationClick(val) {
		if(val >= 1 && val <= this.state.totalCount) {
			this.props.loadMovies(val);
		}
	}

	render() {
		const {pageSize, currentPage, totalCount} = this.state;
		return (
			<Pagination
				pageSize={pageSize}
				currentPage={currentPage}
				totalCount={totalCount}
				handlePaginationClick={this.handlePaginationClick}
			/>
			);
	}
}