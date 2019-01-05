import React from 'react';
import styles from './Search.module.css';

const Search = (props) => {
	return (
		<div style={{backgroundColor: 'white'}}>
          <div className='container'>
          	<div className='input-group'>
	          	<span className={"oi oi-magnifying-glass " + styles.iconCenter}>
	          	</span>
	          	<input type='text' className={'form-control ' + styles.searchField} placeholder='Search for movies, actors, genres, etc.' onChange={props.handleSearchChange}/>
	        </div>
          </div>
        </div>
		);
}

export default Search;