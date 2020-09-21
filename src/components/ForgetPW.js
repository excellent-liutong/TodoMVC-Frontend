import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Login.css";
import axios from 'axios'

class ForgetPW extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.forgetPW = this.forgetPW.bind(this)
  }

  forgetPW (e) {
    if (this._inputPW.value === '') {
      this.setState({ message: '请输入新密码' })
    }
    else if (this._inputCheckPW.value === '') {
      this.setState({ message: '请再次输入新密码' })
    }
    else if (this._inputPW.value !== this._inputCheckPW.value) {
      this.setState({ message: '二次密码输入不一致' })
    }
    else {
      let userInfo = {
        Name: this.props.user.name,
        Password: this._inputPW.value,
      };

      axios.post('user/forgetPW', userInfo).then(
        res => {
          // console.log('修改密码成功：', res.data)
          this.setState({ message: res.data.status })
        }
      ).catch((err) => {
        // console.log('修改密码失败')
        // console.log(err.response.data.error)
        this.setState({ message: err.response.data.error })
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
          <form className="login-form" onSubmit={this.forgetPW}>
            {error}
            <input
              type="password"
              name="pass"
              size="20"
              maxLength="20"
              ref={(a) => { this._inputPW = a }}
              placeholder="请输入新密码"
            >
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
                修改密码
              </button>
            </div>
          </form>
        </div>
      </Fragment>)
  }
}

export default ForgetPW;