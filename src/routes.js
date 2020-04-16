//TODO Create routes


import { Route, Switch } from 'react-router-dom'
import React from 'react'
import Landing from './Components/Landing'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/profile" component={Profile} />
  </Switch>
)
