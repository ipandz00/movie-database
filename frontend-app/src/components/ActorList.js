import React from 'react';
import { Link } from 'react-router-dom';
//import styles from './ActorList.module.css';

function renderActors(data) {
	let actors = data.map((item) => {
			return (
				<div className="col-md-2" key={item._id}>
		          <div className="card mb-2 shadow-sm">
		          	<Link to={"/movies?actor="+item._id}>
		          		<img src={"https://image.tmdb.org/t/p/w200" + item.profile_path} className="card-img-top " alt="..." />
		          	</Link>
		            <div className="card-body">
		              <h5 className="card-title">{item.name}</h5>
		            </div>
		          </div>
		        </div>
				)
		});

		return actors;
}

const ActorList = (props) => {
	return (
		<div className='container mt-4'>
			<h3>Actors</h3>
			<div className='row mt-4'>
				{props.data !== null && 
					renderActors(props.data)
				}
			</div>
		</div>
		);
}

export default ActorList;