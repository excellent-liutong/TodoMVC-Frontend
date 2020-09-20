import React, { Component } from 'react';
import './css/index.css';
import Login from './components/Login'
import Header from './components/Header'
import Todo from './components/Todo'
import Footer from './components/Footer'
import Register from './components/Register'
import ForgetPW from './components/ForgetPW'
import Logout from './components/Logout'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


axios.defaults.baseURL = 'http://localhost:3001/';
// axios.defaults.baseURL = 'http://todolist.light2018.club/';
axios.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem('token')


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      UserID: '',
      loggedIn: false
    };
  }
  componentDidMount () {
    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token')
      const decoded = jwt_decode(token)
      console.log(decoded)
      this.setState({
        name: decoded.Name,
        UserID: decoded.UserID,
        loggedIn: true
      })
    }
  }

  setUser = user => {
    this.setState({
      name: user,
    });
  }

  setLog = log => {
    this.setState({
      loggedIn: log,
    });
  }
  setUserID = userID => {
    this.setState({
      UserID: userID,
    });
  }

  render () {
    console.log('用户:', this.state.name)
    return (
      <div>
        <Router>
          <Header name={this.state.name} setUser={this.setUser} ></Header>
          <div className="app">
            <Switch>
              <Route exact path="/forgetPW" component={() => <ForgetPW user={this.state} />} />

              <Route exact path="/login" component={() => <Login setUser={this.setUser} setUserID={this.setUserID} setLog={this.setLog} user={this.state} />} />

              <Route exact path="/logout" component={() => <Logout setUser={this.setUser} setLog={this.setLog} setUserID={this.setUserID} />} />

              <Route exact path="/register" component={() => <Register user={this.state} setUser={this.setUser} setLog={this.setLog} setUserID={this.setUserID} />} />

              <Route exact path="/" component={() => <Todo user={this.state} setUser={this.setUser} setLog={this.setLog} setUserID={this.setUserID} />} />
            </Switch>
          </div>
        </Router>
        <Footer></Footer>
      </div>
    )
  }

}
export default App;
