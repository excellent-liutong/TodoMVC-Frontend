import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import "../css/Logout.css";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this)
  }

  logout () {
    console.log('logout');
    this.props.setUser("");
    this.props.setLog(false);
    this.props.setUserID("")
    localStorage.clear();
  }

  render () {
    return (
      <Fragment>
        <div className="logout-container">
          <form className="logout-form" >
            <div className="button-container">
              <button>
                <Link to="/" className="fixLink">返回主页</Link>
              </button>
              <button>
                <Link to="/forgetPW" className="fixLink">修改密码</Link>
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