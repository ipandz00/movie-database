import React, { Component } from 'react';
import { getMovie } from '../api.js';

export default class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieData: null,
    };

    this.loadMovie = this.loadMovie.bind(this);
  }
  componentDidMount() {
    this.loadMovie(this.props.match.params.id);
  }

  loadMovie(id) {
    getMovie(id).then(response => 
      console.log(response)
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