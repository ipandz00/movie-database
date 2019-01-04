import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import Header from './containers/HeaderContainer.js';
import MovieList from './containers/MovieListContainer.js';
import Pagination from './containers/PaginationContainer.js';
import { getMovies } from './api.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movieData: null,
      pageSize: 0,
      currentPage: 0,
      totalCount: 0
    };

    this.loadMovies = this.loadMovies.bind(this);
  }
  componentDidMount() {
    this.loadMovies();
  }

  loadMovies(page = 1) {
    getMovies(page).then(response => 
      this.setState({
        movieData: response.data, 
        pageSize: response.size, 
        currentPage: response.page, 
        totalCount: response.totalCount
      })
    )
  }
  render() {
    return (
    <React.Fragment>
      <Header />
      <MovieList data={this.state.movieData}/>
      <Pagination pageSize={this.state.pageSize} currentPage={this.state.currentPage} totalCount={this.state.totalCount} loadMovies={this.loadMovies}/>
    </React.Fragment>
    );
  }
}

export default App;
