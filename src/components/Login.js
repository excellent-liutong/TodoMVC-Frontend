import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import "../css//Login.css";
import axios from 'axios'
import jwt_decode from 'jwt-decode'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = this.login.bind(this)
  }

  login (e) {
    if (this._inputUser.value === '') {
      this.setState({ message: '请输入用户名' })
    }
    else if (this._inputPW.value === '') {
      this.setState({ message: '请输入密码' })
    }
    else {
      let userInfo = {
        Name: this._inputUser.value,
        Password: this._inputPW.value,
      };

      // 登录
      axios.post('user/login', userInfo)
        .then((res) => {
          console.log('用户登录成功')
          console.log(res.data)
          localStorage.setItem("token", res.data)
          const decoded = jwt_decode(res.data)
          this.props.setUser(decoded.Name)
          this.props.setUserID(decoded.UserID)
          this.props.setLog(true)
        })
        .catch((err) => {
          console.log('用户登录失败')
          console.log(err.response.data.error)
          this.setState({ message: err.response.data.error })
        })
    }

    e.preventDefault();
  }

  render () {
    if (this.props.user.loggedIn) {
      return <Redirect to={'/'} />;
    }

    let error = '';
    if (this.state.message) {
      console.log(this.state.message)
      error = (
        <div className="alert">
          {this.state.message}
        </div>
      )
    }
    return (
      <Fragment>
        <div className="login-container">
          <form className="login-form" onSubmit={this.login}>
            {error}
            <input
              ref={(a) => { this._inputUser = a }}
              placeholder="请输入用户名">
            </input>

            <input
              type="password"
              name="pass"
              size="20"
              maxLength="20"
              ref={(a) => { this._inputPW = a }}
              placeholder="请输入密码">
            </input>

            <div className="button-container">
              <button>
                <Link to="/" className="fixLink">返回主页</Link>
              </button>
              <button type="submit">
                登录
                {/* <Link to="/" className="fixLink">登录</Link> */}
              </button>
            </div>
          </form>
          <div id="setting-container">
            <Link to="/register" className="fixLink setting">立即注册</Link>
          </div>

        </div>
      </Fragment>)
  }
}

export default Login;