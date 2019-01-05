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
	      </header>
		);
}

export default Header;