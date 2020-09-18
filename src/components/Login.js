import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Login.css";


class Login extends Component {
  render () {
    return (
      <Fragment>
        <div className="login-container">
          <form className="login-form" onSubmit={this.login}>

            <input
              ref={(a) => { this._inputElement = a }}
              placeholder="请输入用户名">
            </input>

            <input
              ref={(a) => { this._inputElement = a }}
              placeholder="请输入密码">
            </input>

            <div class="button-container">
              <button type="submit">
                <Link to="/" className="fixLink">返回主页</Link>
              </button>
              <button type="submit">
                登录
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