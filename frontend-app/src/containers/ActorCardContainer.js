import React, { Component } from 'react';
import ActorCard from '../components/ActorCard.js';

export default class ActorCardContainer extends Component {
	render() {
		return (
			<ActorCard
				data={this.props.data}
			/>
			);
	}
}