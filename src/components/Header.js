import React, { Component } from 'react';
import '../css/Header.css';
import { Link } from "react-router-dom";

class Header extends Component {
  render () {
    let logLink;
    if (this.props.user) {
      logLink = (<Link className="button fixLink" to="/logout">退出</Link>)
    }
    else {
      logLink = (<Link className="button fixLink" to="/login">登录</Link>)
    }

    return (
      <header id="Header-container" >
        <h1><Link className="fixLink" to="/">todos</Link></h1>
        <div id="Header-buttons">
          <Link className="button fixLink" to="/register">注册</Link>
          {logLink}
        </div>
      </header>)
  }
}

export default Header;



