import React from 'react';
import ActorCard from '../containers/ActorCardContainer.js';
//import styles from './ActorList.module.css';

const ActorList = (props) => {
	return (
		<div className='container mt-4'>
			<h3>Actors</h3>
			<div className='row mt-4'>
				{props.data !== null && 
					props.data.map((item) => {
						return <ActorCard data={item} key={item._id}/>;
					})
				}
			</div>
		</div>
		);
}

export default ActorList;