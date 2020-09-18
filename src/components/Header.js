import React, { Component } from 'react';
import '../css/Header.css';
import { Link } from "react-router-dom";

class Header extends Component {
  render () {
    return (
      <header id="Header-container" >
        <h1>todos</h1>
        <div id="Header-buttons">
          <Link className="button" to="/">主页</Link>
          <Link className="button" to="/login">登录</Link>
        </div>
      </header>)
  }
}

export default Header;



