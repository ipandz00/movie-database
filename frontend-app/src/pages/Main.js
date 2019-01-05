import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Movie from './Movie'
import Movies from './Movies'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Movies}/>
      <Route path='/movie/:id' component={Movie}/>
    </Switch>
  </main>
)

export default Main;