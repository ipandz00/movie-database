import React, { Component } from 'react';
import { getMovie } from '../api.js';
import MovieOverview from '../containers/MovieContainer.js';

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
      this.setState({movieData: response})
    )
  }
  render() {
    return (
    <React.Fragment>
      <MovieOverview data={this.state.movieData}/>
    </React.Fragment>
    );
  }
}