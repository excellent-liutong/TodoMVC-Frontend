
import ReactDOM from 'react-dom';
import React, { Component, Fragment } from 'react';
import TodoList from './TodoList'

import { createStore } from 'redux'
import { Input, Button, } from 'antd';

import Login from './Login'
import Register from './Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


ReactDOM.render(
  <Router>
    <div style={{ overflow: "hidden" }} >
      <Button type="primary" style={{ float: "right" }}>
        <Link to='/login'>登录页面</Link>
      </Button>
      <Button type="primary" style={{ float: "right" }}>
        <Link to='/register'>注册页面</Link>
      </Button>
      <Button type="primary" style={{ float: "right" }}>
        <Link to='/todoList'>todo页面</Link>
      </Button>
    </div>
    <Route path='/login' component={Login}></Route>
    <Route exact path='/register' component={Register} ></Route>
    <Route exact path='/todoList' component={TodoList} ></Route>
  </Router>,


  document.getElementById('root')
);



