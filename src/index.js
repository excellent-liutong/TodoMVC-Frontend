import ReactDOM from 'react-dom';
import React from 'react';
import './css/index.css';
import Login from './components/Login'
import Header from './components/Header'
import Todo from './components/Todo'
import Footer from './components/Footer'
import Register from './components/Register'
import ChangePW from './components/ChangePW'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

let destination = document.querySelector('#container');
axios.defaults.baseURL = 'http://localhost:3001/';

ReactDOM.render(
  <div>

    <Router>
      <Header></Header>
      <div className="app">
        <Switch>
          <Route exact path="/changePW" component={ChangePW} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Todo} />
        </Switch>
      </div>
    </Router>
    <Footer></Footer>
  </div>
  , destination
);
