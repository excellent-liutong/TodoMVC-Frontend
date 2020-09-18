import ReactDOM from 'react-dom';
import React from 'react';
import './css/index.css';
import Login from './components/Login'
import Header from './components/Header'
import Todo from './components/Todo'
import Footer from './components/Footer'
import Register from './components/Register'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

let destination = document.querySelector('#container')

ReactDOM.render(
  <div>

    <Router>
      <Header></Header>
      <div className="app">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Todo} />
      </Switch>
      </div>
    </Router>
    <Footer></Footer>
  </div>
  , destination
);
