import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Login.css";
import { updateToBackEnd } from './utils/axios'

class ChangePW extends Component {
  constructor(props) {
    super(props);

    this.changePW = this.changePW.bind(this)
  }

  changePW (e) {


    if (this._inputUser.value !== '' && this._inputPW !== '') {
      let userInfo = {
        Name: this._inputUser.value,
        Password: this._inputPW.value,
      };
      console.log(userInfo)
      updateToBackEnd('user/changePW', userInfo)
    }

    e.preventDefault();
  }

  render () {
    return (
      <Fragment>
        <div className="login-container">
          <form className="login-form" onSubmit={this.changePW}>
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
              placeholder="请输入新密码">
            </input>

            <input
              type="password" name="pass" size="20" maxLength="20"
              ref={(a) => { this._inputCheckPW = a }}
              placeholder="确认新密码">
            </input>

            <div className="button-container">
              <button>
                <Link to="/" className="fixLink">返回主页</Link>
              </button>
              <button type="submit">
                修改
            </button>
            </div>
          </form>

        </div>
      </Fragment>)
  }
}

export default ChangePW;