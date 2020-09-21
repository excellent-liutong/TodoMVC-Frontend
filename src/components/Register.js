import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
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
    if (this._inputName.value === '') {
      this.setState({ message: '请输入用户名' })
    }
    else if (this._inputPW.value === '') {
      this.setState({ message: '请输入密码' })
    }
    else if (this._inputCheckPW.value === '') {
      this.setState({ message: '请再次输入密码' })
    }
    else if (this._inputPW.value !== this._inputCheckPW.value) {
      this.setState({ message: '二次密码输入不一致' })
    }
    else {
      let userInfo = {
        Name: this._inputName.value,
        Password: this._inputPW.value,
      };

      axios.post("user/register", userInfo)
        .then((res) => {
          if (!res.data.error) {
            // console.log(res.data.status)
            this.props.setUser(res.data.status.Name)
            this.props.setUserID(res.data.status.UserID)
            this.props.setLog(true);
          }
          else {
            this.setState({ message: res.data.error })
          }

        })
        .catch((err) => {
          this.setState({ message: '用户注册失败' })
        })
    }

    e.preventDefault();
  }


  render () {
    if (this.props.user.loggedIn) {
      return <Redirect to={'/'} />
    }

    let error = '';
    if (this.state.message) {
      error = (
        <div className="alert" >{this.state.message}</div>
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
                注册
              </button>
            </div>
          </form>
        </div>
      </Fragment>)
  }
}

export default Register;