import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import Header from './containers/HeaderContainer.js';
import Main from './pages/Main.js';

const App = () => (
  <React.Fragment>
    <Header />
    <Main />
  </React.Fragment>
)

export default App
