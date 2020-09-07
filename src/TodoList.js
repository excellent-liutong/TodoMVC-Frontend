import React, { Component, Fragment } from 'react';
import './style.css'
import TodoItem from './TodoItem'

import 'antd/dist/antd.css';
import { Input, Button, } from 'antd';





import './style.css'

const storage = window.localStorage;

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: ['学习', '工作', '睡觉']
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleItemDelete = this.handleItemDelete.bind(this)


    };

    componentDidMount () {
        let todoList = storage.getItem('todoList')
        if (todoList) {
            this.setState({
                list: JSON.parse(todoList)
                // list: todoList
            })
        }
    }
    componentDidUpdate () {
        storage.setItem('todoList', JSON.stringify(this.state.list))
    }

    render () {
        return (<Fragment>
            <div style={{ overflow: "hidden" }} >
                <Button type="primary" style={{ float: "right" }}>
                    <a href="">登录</a>
                </Button>
                <Button type="primary" style={{ float: "right" }}>
                    <a href="" >注册</a>
                </Button>
            </div>


            <div style={{
                width: '500px', margin: '0 auto',
            }}>

                {/* 下面是todoList */}
                <label htmlFor='insertArea' style={{ width: '300px', fontSize: '50px', margin: '0 auto', }} >今日待办</label>
                <br></br>
                <div>
                    <Input
                        id='insertArea'
                        placeholder="请输入待办事项"
                        style={{ width: '300px', marginRight: '20px', float: 'left' }}
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <Button
                        type="primary"
                        shape="round"
                        onClick={this.handleBtnClick}
                    // style={{ width: '10px', marginRight: '20px' ,float:'right'}}
                    >提交                </Button>
                </div>

                <ol>
                    {this.getTodoItem()}
                </ol>
            </div>
        </Fragment>)
    }
    getTodoItem () {
        return this.state.list.map((item, index) => {
            return (
                <Fragment key={index}>

                    <TodoItem
                        index={index}
                        content={item}
                        deleteItem={this.handleItemDelete}
                        className='pedding'
                    />
                </Fragment>
            )
        })
    }

    handleInputChange (e) {
        const value = e.target.value
        this.setState(
            () => ({
                inputValue: value
            }))

    }


    handleBtnClick () {
        this.setState((prevState) => {
            // 判断输出是否为空
            if (prevState.inputValue.length > 0) {
                return ({
                    list: [...prevState.list, prevState.inputValue],
                    inputValue: ''
                })
            }

        })
    }

    handleItemDelete (index) {
        this.setState((prevState) => {
            let list = [...prevState.list]
            list.splice(index, 1)
            return { list }
        })
    }

}

export default TodoList;