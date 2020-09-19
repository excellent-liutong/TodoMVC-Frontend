import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Register.css";
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.register = this.register.bind(this)
  }

  register (e) {
    // 创建用户
    if (this._inputName.value !== '' && this._inputPW !== '') {
      let userInfo = {
        Name: this._inputName.value,
        Password: this._inputPW.value,
      };
      // localStorage.setItem("Name", this._inputName.value)

      console.log(userInfo)

      // 向后端传入参数，获取token
      // axios.post('token', userInfo).then((res) => {
      //   localStorage.setItem("token", res.data.token)
      //   console.log('返回的token为：', res.data.token)
      // }).then(() => {
      axios.post("user/register", userInfo)
        .then((res) => {
          console.log('用户注册成功', res.data)
        })
        .catch((err) => {
          console.log('用户注册失败')
          this.setState({ message: err.response.data.message })

          //   .catch(() => { console.log('后台post请求处理失败') })
          // })
          //   .catch ((err) => {
          //   console.log('后台post请求处理失败')
          //   this.setState({ message: err.response.data.message })
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
        <div className="register-container">
          <form className="register-form" onSubmit={this.register}>

            {error}
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
                <Link to="/" className="fixLink">注册</Link>
              </button>
            </div>
          </form>
        </div>
      </Fragment>)
  }
}

export default Register;