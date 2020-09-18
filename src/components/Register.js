import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Register.css";
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: [],
    };
    this.register = this.register.bind(this)
  }

  register (e) {
    const storage = window.localStorage;

    // 创建用户
    if (this._inputName.value !== '' && this._inputPW !== '') {
      let userInfo = {
        name: this._inputName.value,
        password: this._inputPW.value,
      };
      storage.setItem("name", this._inputName.value)

      console.log(userInfo)

      // 向后端传入参数，获取token

      axios.post('http://localhost:3001/token', userInfo).then((res) => {
        storage.setItem("token", res.data.token)
        console.log('返回的token为：', res.data.token)
      }).then(() => {
        let token = storage.getItem('token')
        const headers = {
          'authorization': 'Bearer ' + token
        }
        // 校验身份
        axios.post('http://localhost:3001/user/vertify', {}, { headers: headers }).then((res) => {
          console.log(res.data)
        }).catch(() => { console.log('验证失败error') })

        // 创建用户
        axios.post('http://localhost:3001/user/register', userInfo, { headers: headers }).then((res) => {
          console.log(res.data)
        }).catch(() => { console.log('注册失败error') })

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
              <Link to="/" className="fixLink">返回主页</Link>
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