import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Login.css";
import axios from 'axios'

class ForgotPW extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.forgotPW = this.forgotPW.bind(this)
  }

  forgotPW (e) {
    if (this._inputUser.value !== '' && this._inputPW !== '') {
      let userInfo = {
        Name: this._inputUser.value,
        Password: this._inputPW.value,
      };
      console.log(userInfo)

      axios.post('user/changePW', userInfo).then(
        res => {
          console.log('身份验证请求成功：', res.data)
          this.setUser(res.data.userName)
        },
        err => {
          console.log(err)
        }
      ).catch((err) => {
        console.log('后台post请求处理失败')
        this.setState({ message: err.response.data.message })
      })
    }

    e.preventDefault();
  }

  render () {
    let error = '';

    if (this.state.message) {
      error = (
        <div className="alert">{this.state.message}</div>
      )
    }
    return (
      <Fragment>
        <div className="login-container">
          <form className="login-form" onSubmit={this.forgotPW}>
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
                <Link to="/" className="fixLink">修改</Link>
              </button>
            </div>
          </form>

        </div>
      </Fragment>)
  }
}

export default ForgotPW;