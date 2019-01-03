import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import Header from './containers/HeaderContainer.js';

class App extends Component {
  componentDidMount() {
    fetch('http://localhost:8081/movies')
    .then(response => response.json())
    .then(data => console.log(data));
  }
  render() {
    return (
    <div>
      <Header />
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
    );
  }
}

export default App;
