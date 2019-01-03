import React from 'react';
import styles from './Header.module.css';

const Header = (props) => {
	return (
		<header className={styles.header}>
	        <div className='container'>
	          <nav className="navbar navbar-expand-lg">
	            <a className={"navbar-brand " + styles.logoText} href="/">MovieDB</a>
	          </nav>
	        </div>
	        <div style={{backgroundColor: 'white'}}>
	          <div className='container'>
	          	<div className='input-group'>
		          	<span className={"oi oi-magnifying-glass " + styles.iconCenter}>
		          	</span>
		          	<input type='text' className={'form-control ' + styles.searchField} placeholder='Search for movies, actors, genres, etc.' onChange={props.handleSearchChange}/>
		        </div>
	          </div>
	        </div>
	      </header>
		);
}

export default Header;