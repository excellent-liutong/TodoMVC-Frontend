import ReactDOM from 'react-dom';
import React from 'react';
import './css/index.css';
import Todo from './components/Todo'
import Footer from './components/Footer'
import Header from './components/Header'

let destination = document.querySelector('#container')

ReactDOM.render(
  <div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>, destination
);
