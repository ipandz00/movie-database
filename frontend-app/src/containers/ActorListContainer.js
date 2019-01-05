import React, { Component } from 'react';
import ActorList from '../components/ActorList.js';

export default class ActorListContainer extends Component {
	render() {
		return (
			<ActorList
				data={this.props.data}
			/>
			);
	}
}