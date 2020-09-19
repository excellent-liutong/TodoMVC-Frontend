import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css//Login.css";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout () {
    console.log('logout');
    localStorage.clear();
    this.props.setUser(null);
  }

  render () {
    return (
      <Fragment>
        <div className="login-container">
          <form className="login-form" >
            <div className="button-container">
              <button>
                <Link to="/" className="fixLink">返回主页</Link>
              </button>
              <button onClick={() => { this.logout() }}>
                <Link to="/" className="fixLink">退出登录</Link>
              </button>
            </div>
          </form>
        </div>
      </Fragment>)
  }
}

export default Logout;