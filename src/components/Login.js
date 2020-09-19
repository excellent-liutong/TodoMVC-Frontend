import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import "../css//Login.css";
import axios from 'axios'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = this.login.bind(this)
  }

  login (e) {
    if (this._inputUser.value !== '' && this._inputPW !== '') {
      console.log('使用登录')
      let userInfo = {
        Name: this._inputUser.value,
        Password: this._inputPW.value,
      };
      console.log(userInfo)

      // 登录
      axios.post('user/login', userInfo)
        .then((res) => {
          console.log('用户登录成功')
          console.log(res.data)
          // localStorage.setItem("name", res.data.value)
          localStorage.setItem("token", res.data)
          // console.log(res.data)
          // this.props.setUser(res.data.Name)
        })
        .catch((err) => {
          console.log('后台post请求处理失败')
          this.setState({ message: err.response.data.message })

        })

      this.setState({
        loggedIn: true
      });
    }

    e.preventDefault();
  }

  render () {
    // if (this.state.loggedIn) {
    //   return <Redirect to={'/'} />;
    // }

    let error = '';
    if (this.state.message) {
      error = (
        <div className="alert">{this.state.message}</div>
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
                <Link to="/" className="fixLink">登录</Link>
              </button>
            </div>
          </form>


          <div id="setting-container">
            <Link to="/forgotPW" className="fixLink setting">忘记密码</Link>

            <Link to="/register" className="fixLink setting">立即注册</Link>

          </div>

        </div>
      </Fragment>)
  }
}

export default Login;