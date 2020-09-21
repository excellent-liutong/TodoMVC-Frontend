import ReactDOM from 'react-dom';
import React from 'react';
import './css/index.css';
import App from './App'
import fastclick from 'fastclick'
fastclick.attach(document.body)
let destination = document.querySelector('#container');

ReactDOM.render(<App />, destination);
