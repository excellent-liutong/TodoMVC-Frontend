import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Register.css";
import axios from 'axios'
import { updateToBackEnd } from './utils/axios'

class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this)
  }

  register (e) {
    const storage = window.localStorage;

    // 创建用户
    if (this._inputName.value !== '' && this._inputPW !== '') {
      let userInfo = {
        Name: this._inputName.value,
        Password: this._inputPW.value,
      };
      storage.setItem("name", this._inputName.value)

      console.log(userInfo)

      // 向后端传入参数，获取token
      axios.post('token', userInfo).then((res) => {
        storage.setItem("token", res.data.token)
        console.log('返回的token为：', res.data.token)
      }).then(() => {
        updateToBackEnd('user/register', userInfo)
      }
      ).catch(() => { console.log('error') })
    }

    e.preventDefault();
  }


  render () {
    return (
      <Fragment>
        <div className="register-container">
          <form className="register-form" onSubmit={this.register}>

            <input
              ref={(a) => { this._inputName = a }}
              placeholder="请输入用户名">
            </input>

            <input
              type="password" name="pass" size="20" maxLength="20"
              ref={(a) => { this._inputPW = a }}
              placeholder="请输入密码">
            </input>

            <input
              type="password" name="pass" size="20" maxLength="20"
              ref={(a) => { this._inputCheckPW = a }}
              placeholder="确认密码">
            </input>

            <div className="button-container">
              <button><Link to="/" className="fixLink">返回主页</Link></button>
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