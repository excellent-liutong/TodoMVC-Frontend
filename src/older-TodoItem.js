import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import { Button, } from 'antd';
import './style.css'
import axios from 'axios'
import { CSSTransition } from 'react-transition-group';

class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
        this.handleItemCompleted = this.handleItemCompleted.bind(this)
        this.handleItemDelete = this.handleItemDelete.bind(this)
    }
    render () {
        const { content } = this.props
        return (
            <Fragment>
                {/* <CSSTransition> */}

                    <li className={this.state.show ? 'todo' : 'achieve'}

                    >{content}
                    </li>
                {/* </CSSTransition> */}

                <Button onClick={this.handleItemCompleted}>完成</Button>
                <Button onClick={this.handleItemDelete}>删除</Button>
                <br />
                <br />


            </Fragment>
        )
    }
    handleItemCompleted () {
        this.setState({
            show: this.state.show ? false : true
        })
        let updateTodo = {           
            Thing: this.props.content,           
        }
        const storage = window.localStorage;
        axios.post('http://localhost:3001/login',).then((res) => {
            storage.setItem("token", res.data.token)
        }).catch(() => { console.log('error') })
        let token=storage.getItem('token')
        const headers = {
            'authorization': 'Bearer ' + token
        }
        console.log(updateTodo.Thing)
        axios.post('http://localhost:3001/todo/updateTodo', updateTodo,{headers}).then((res) => {
                console.log(res.data)
            }).catch(() => { console.log('error') })
        
    }

    handleItemDelete () {
        this.props.deleteItem(this.props.index)
        this.setState({
            show: true
        })
    }
}

export default TodoItem;