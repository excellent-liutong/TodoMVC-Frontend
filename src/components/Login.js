import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Login.css";
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userInfo: [],
    };

    this.login = this.login.bind(this)
  }

  login (e) {
    const storage = window.localStorage;
    let token=storage.getItem('token')
    const headers = {
        'authorization': 'Bearer ' + token
    }
    console.log(headers)

    if (this._inputUser.value !== '' && this._inputPW !== '') {
      let userInfo = {
        name: this._inputUser.value,
        pw: this._inputPW.value,
      };
      console.log(userInfo)

      //向后端传入参数
      axios.post('http://localhost:3001/user/vertify', userInfo, { headers: headers }).then((res) => {
        console.log(res.data)
      }).catch(() => { console.log('error') })


    }
    this._inputUser.value = "";

    e.preventDefault();
  }

  render () {
    return (
      <Fragment>
        <div className="login-container">
          <form className="login-form" onSubmit={this.login}>
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