import React from 'react';
import { Link } from 'react-router-dom';
import ActorCard from '../containers/ActorCardContainer.js';
//import styles from './ActorList.module.css';

const ActorList = (props) => {
	return (
		<div className='container mt-4'>
			<h3>Actors</h3>
			<div className='row mt-4'>
				{props.data !== null && 
					props.data.map((item) => {
						return <ActorCard data={item} />;
					})
				}
			</div>
		</div>
		);
}

export default ActorList;