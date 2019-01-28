import React from 'react';
import { Link } from 'react-router-dom';

const ActorCard = (props) => {
	let item = props.data;
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
}

export default ActorCard;