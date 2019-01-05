import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Movie from './Movie'
import Movies from './Movies'

const Main = () => (
  <main>
    <Switch>
      <Route path='/movies' component={Movies}/>
      <Route exact path='/movie/:id' component={Movie}/>
      <Redirect from="/" to="/movies" />
    </Switch>
  </main>
)

export default Main;