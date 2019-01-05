import React from 'react';
//import styles from './ActorList.module.css';

function renderActors(data) {
	let actors = data.map((item) => {
			return (
				<div className="col-md-2" key={item._id}>
		          <div className="card mb-2 shadow-sm">
		          	<img src={"https://image.tmdb.org/t/p/w200" + item.profile_path} className="card-img-top " alt="..." />
		            <div className="card-body">
		              <h5 className="card-title">{item.character}</h5>
		              <p className="card-text">{item.name}</p>
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