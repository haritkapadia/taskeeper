/* eslint-disable no-unused-vars */
//
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './routes/Home'
import Signup from './routes/Signup'
import Login from './routes/Login'
import Logout from './routes/Logout'
import TaskList from './routes/TaskList'

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/logged-in">
        <TaskList />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
    </Switch>
  </Router>
)

export default App
