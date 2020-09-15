// import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component, Fragment } from 'react';
import TodoList from './TodoList'
// import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { Input, Button, } from 'antd';

import Login from './Login'
import Register from './Register'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const initialState = {
    count: 0
}

function reducer (state = initialState, action) {
    console.log('reducer', state, action);
    return state;
}

// const store = createStore(reducer)
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "DECREMENT" });
// store.dispatch({ type: "RESET" });


ReactDOM.render(


    <Router>
        <div style={{ overflow: "hidden" }} >
            <Button type="primary" style={{ float: "right" }}>
                {/* <a href="">登录</a> */}

                <Link to='/login'>登录页面</Link>
            </Button>
            <Button type="primary" style={{ float: "right" }}>
                {/* <a href="" >注册</a> */}
                <Link to='/register'>注册页面</Link>
            </Button>
            <Button type="primary" style={{ float: "right" }}>
                {/* <a href="" >注册</a> */}
                <Link to='/todoList'>todo页面</Link>
            </Button>

        </div>

        <Route path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register} ></Route>

        <Route exact path='/todoList' component={TodoList} ></Route>


    </Router>    ,


    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

