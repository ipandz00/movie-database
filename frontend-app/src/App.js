import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import Header from './containers/HeaderContainer.js';
import MovieList from './containers/MovieListContainer.js';
import { getMovies } from './api.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movieData: null
    };
  }
  componentDidMount() {
    getMovies().then(response => this.setState({movieData: response}))
  }
  render() {
    return (
    <React.Fragment>
      <Header />
      <MovieList data={this.state.movieData}/>
    </React.Fragment>
    );
  }
}

export default App;
