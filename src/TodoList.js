import React, { Component, Fragment } from 'react';
import './style.css'
import TodoItem from './TodoItem'


import axios from 'axios'
import 'antd/dist/antd.css';
import { Input, Button, } from 'antd';




import { createStore } from 'redux'

// import { connect } from 'react-redux';
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

// function mapStateToProps (state) {
//     return {
//         count: state.count
//     };
// }




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



            <div style={{
                width: '300px', margin: '0 auto',
            }}>

                {/* 下面是todoList */}
                <label htmlFor='insertArea' style={{ width: '300px', fontSize: '50px', margin: '0 auto', }} >今日待办</label>
                <br></br>
                <div style={{ overflow: "hidden" }}>
                    <Input
                        id='insertArea'
                        placeholder="请输入待办事项"
                        style={{ width: '200px', marginRight: '20px', float: 'left' }}
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <Button
                        // style={{ width: '50px',  }}
                        type="primary"
                        shape="round"
                        onClick={this.handleBtnClick}

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

            const storage = window.localStorage;
            let token=storage.getItem('token')
            const headers = {
                'authorization': 'Bearer ' + token
            }
            console.log(headers)
            axios.post('http://localhost:3001/user/vertify', {}, { headers: headers }).then((res) => {
                    console.log(res.data)
                }).catch(() => { console.log('error') })

            // 判断输出是否为空
            if (prevState.inputValue.length > 0) {
                let todoInfo = {
                    Name: 'light',
                    Thing: prevState.inputValue,
                    achieved: false
                }

                axios.post('http://localhost:3001/login', {}).then((res) => {
                    console.log('token',res.data.token)
                    console.log(typeof res.data)
                    storage.setItem("token",res.data.token)
        
                }).catch(() => { console.log('error') })
                        
                


                axios.post('http://localhost:3001/todo/test', todoInfo,{headers: headers}).then((res) => {
                    console.log(res.data)
                }).catch(() => { console.log('error') })



                return ({
                    list: [...prevState.list, prevState.inputValue],
                    inputValue: ''
                })
            }

        })
    }

    handleItemDelete (index) {
        this.setState((prevState) => {
            const storage = window.localStorage;
            axios.post('http://localhost:3001/login',).then((res) => {
                storage.setItem("token", res.data.token)
            }).catch(() => { console.log('error') })
            let token=storage.getItem('token')
            const headers = {
                'authorization': 'Bearer ' + token
            }

            let list = [...prevState.list]
            console.log(list[index])
            let deleteTodo = {
                Name: 'light',
                Thing: list[index],
                achieved: false
            }
            

            axios.post('http://localhost:3001/todo/deleteTodo', deleteTodo,{ headers: headers }).then((res) => {
                    console.log(res.data)
                }).catch(() => { console.log('error') })
            list.splice(index, 1)
            
            return { list }
        })
    }

}

export default TodoList;

// export default connect(mapStateToProps)(TodoList);