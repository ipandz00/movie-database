import React, { Component } from 'react';
import { getMovie } from '../api.js';

class Movie extends Component {
  constructor() {
    super();

    this.state = {
      movieData: null,
    };

    this.loadMovie = this.loadMovie.bind(this);
  }
  componentDidMount() {
    this.loadMovie(1);
  }

  loadMovie(id) {
    getMovie(id).then(response => 
      console.log(response);
    )
  }
  render() {
    return (
    <React.Fragment>
      <p>Single movie</p>
    </React.Fragment>
    );
  }
}