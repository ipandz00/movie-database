import React from 'react';
import styles from './Search.module.css';
import { Collapse, Card } from 'reactstrap';

function renderListItems(data) {
	let items = data.map((item) => {
		let icon = item.type === 'movie'?'oi oi-video':'oi oi-person';
		let href = item.type === 'movie'? "/movie/"+item.id: "/movies?actor=" +item.id;
		return (
			<a href={href} className="list-group-item list-group-item-action" key={item.id}><span className={icon}></span>  {item.name}</a>
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