import React from 'react';
import styles from './Search.module.css';
import { Collapse, Card } from 'reactstrap';

function renderListItems(data) {
	let items = data.map((item) => {
		return (
			<a href={"/movie/"+item._id} className="list-group-item list-group-item-action" key={item.id}><span className="oi oi-video"></span>  {item.name}</a>
			)
	});
	return items;
}

const Search = (props) => {
	return (
		<div style={{backgroundColor: 'white'}}>
          <div className='container'>
          	<div className='input-group'>
	          	<span className={"oi oi-magnifying-glass " + styles.iconCenter}>
	          	</span>
	          	<input type='text' className={'form-control ' + styles.searchField} placeholder='Search for movies, actors, genres, etc.' onChange={props.handleSearchChange}/>
	        </div>
	        <Collapse isOpen={props.visible}>
	          <Card>
	            <ul className="list-group">
				  {props.data && 
				  	renderListItems(props.data)
				  }
				</ul>
	          </Card>
	        </Collapse>
          </div>
        </div>
		);
}

export default Search;