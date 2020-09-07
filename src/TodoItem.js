import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import {  Button, } from 'antd';

import './style.css'
class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
        this.handleItemCompleted = this.handleItemCompleted.bind(this)
        this.handleItemDelete=this.handleItemDelete.bind(this)
    }
    render () {
        const { content } = this.props
        return (
            <Fragment>
                
                <li className={this.state.show ? 'todo' : 'achieve'}
                >{content}
                </li>
                <Button onClick={this.handleItemCompleted}>完成</Button>
                <Button onClick={this.handleItemDelete}>删除</Button>
                                <br/>

                
            </Fragment>
        )
    }
    handleItemCompleted () {
        this.setState({
            show: this.state.show ? false : true
        })
    }
    handleItemDelete(){
        this.props.deleteItem(this.props.index)
    }
}

export default TodoItem;