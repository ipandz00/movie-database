import React from 'react';
//import styles from './Pagination.module.css';

function renderPaginationNumbers(totalNum, activePage, handler) {
	let JSX = [];

	for(let i = 0; i < totalNum; i++) {
		if(i + 1 === activePage) {
			JSX.push (
			<li className="page-item active" key={i + 1} onClick={() => handler(i+1)}>
		      <span className="page-link">
		        {activePage}
		        <span className="sr-only">(current)</span>
		      </span>
		    </li>)
		}
		else {
			JSX.push (
				<li className="page-item" key={i + 1} onClick={() => handler(i+1)}>
				    <span className="page-link">
				    {i + 1}
				    </span>
			    </li>
				)
		}
	}

	return JSX;
}

const Pagination = (props) => {
	return (
		<nav aria-label="...">
		  <ul className="pagination justify-content-center">
		    <li className={props.currentPage === 1 ? "page-item disabled" : "page-item"} onClick={() => props.handlePaginationClick(props.currentPage - 1)}>
		      <span className="page-link">Previous</span>
		    </li>
		    {renderPaginationNumbers(props.totalCount ,props.currentPage, props.handlePaginationClick)}
		    <li className={props.currentPage === props.totalCount ? "page-item disabled" : "page-item"} onClick={() => props.handlePaginationClick(props.currentPage + 1)}>
		      <span className="page-link">Next</span>
		    </li>
		  </ul>
		</nav>
		);
}

export default Pagination;