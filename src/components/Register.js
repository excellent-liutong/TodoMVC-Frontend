import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Register.css";


class Register extends Component {
  render () {
    return (
      <Fragment>
        <div className="register-container">
          <form className="register-form" onSubmit={this.login}>

            <input
              ref={(a) => { this._inputElement = a }}
              placeholder="请输入用户名">
            </input>

            <input
              ref={(a) => { this._inputElement = a }}
              placeholder="请输入密码">
            </input>

            <input
              ref={(a) => { this._inputElement = a }}
              placeholder="确认密码">
            </input>

            <div class="button-container">
              <button type="submit">
                <Link to="/" className="fixLink">返回主页</Link>
              </button>
              <button type="submit">
                注册
            </button>
            </div>
          </form>
        </div>
      </Fragment>)
  }
}

export default Register;