import React, { Component } from 'react';
import MovieList from '../containers/MovieListContainer.js';
import Pagination from '../containers/PaginationContainer.js';
import Search from '../containers/SearchContainer.js';
import { getMovies } from '../api.js';

export default class Movies extends Component {
  constructor() {
    super();

    this.state = {
      movieData: null,
      pageSize: 0,
      currentPage: 0,
      totalCount: 0,
    };

    this.genreId = null;

    this.loadMovies = this.loadMovies.bind(this);
  }
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    this.genreId = params.get('genre');
    this.actorId = params.get('actor');

    this.loadMovies(1, this.genreId, '');
  }

  loadMovies(page = 1, genre, query) {
    genre = this.genreId;
    getMovies(page, 9, genre, query, this.actorId).then(response => 
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
      <Search />
      <MovieList data={this.state.movieData}/>
      <Pagination pageSize={this.state.pageSize} currentPage={this.state.currentPage} totalCount={this.state.totalCount} loadMovies={this.loadMovies}/>
    </React.Fragment>
    );
  }
}