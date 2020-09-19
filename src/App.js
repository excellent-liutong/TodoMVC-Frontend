import React, { Component } from 'react';
import './css/index.css';
import Login from './components/Login'
import Header from './components/Header'
import Todo from './components/Todo'
import Footer from './components/Footer'
import Register from './components/Register'
import ForgotPW from './components/ForgotPW'
import Logout from './components/Logout'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


axios.defaults.baseURL = 'http://localhost:3001/';
axios.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem('token')


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount () {
    // 验证token
    axios.post('token/vertify').then(
      res => {
        console.log('身份验证请求成功：', res.data)
        this.setUser(res.data.userName)

      },
      err => {
        console.log(err)
      }
    )
    this.setUser = user => {
      this.setState({
        user: user
      });

    }
  }

  render () {
    console.log('用户:', this.state.user)
    return (
      <div>
        <Router>
          <Header user={this.state.user} setUser={this.setUser} ></Header>
          <div className="app">
            <Switch>
              <Route exact path="/forgotPW" component={() => <ForgotPW user={this.state.user} />} />
              <Route exact path="/login" component={() => <Login setUser={this.setUser} />} />
              <Route exact path="/logout" component={() => <Logout setUser={this.setUser} />} />
              <Route exact path="/register" component={() => <Register setUser={this.setUser} />} />
              <Route exact path="/" component={() => <Todo user={this.state.user} />} />
            </Switch>
          </div>
        </Router>
        <Footer></Footer>
      </div>
    )
  }

}
export default App;
