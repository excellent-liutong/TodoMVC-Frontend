import React, { Component } from 'react';
import '../css/Header.css';
import { Link } from "react-router-dom";

class Header extends Component {
  render () {
    return (
      <header id="Header-container" >
        <h1><Link   className="fixLink" to="/">todos</Link></h1>
        <div id="Header-buttons">
          <Link className="button fixLink" to="/register">注册</Link>
          <Link className="button fixLink" to="/login">登录</Link>
        </div>
      </header>)
  }
}

export default Header;



