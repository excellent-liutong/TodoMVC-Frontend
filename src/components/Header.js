import React, { Component, Fragment } from 'react';
import '../css/Header.css';
import { Link } from "react-router-dom";

class Header extends Component {
  render () {
    let logLink;
    if (this.props.name) {
      logLink = (<Link className="button fixLink" to="/logout">{this.props.name}</Link>)
    }
    else {
      logLink = (
        <Fragment>
          <Link className="button fixLink" to="/register">注册</Link>
          <Link className="button fixLink" to="/login">登录</Link>
        </Fragment>)
    }

    return (
      <header id="Header-container" >
        <h1><Link className="fixLink" to="/">todos</Link></h1>
        <div id="Header-buttons">
          {logLink}
        </div>
      </header>)
  }
}

export default Header;



