import React, { Component, Fragment } from 'react';
import { Input, Button, } from 'antd';
import axios from 'axios'

import 'antd/dist/antd.css';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
    }


    render () {
        return (
            <Fragment>
                <div>登录</div>
                <Input
                    id='email'
                    placeholder="请输入注册邮箱"
                    style={{ width: '200px', marginRight: '20px', float: 'left' }}
                    email={this.state.email}
                    onChange={this.handleEmailChange}
                />
                <Input
                    id='password'
                    placeholder="请输入密码"
                    style={{ width: '200px', marginRight: '20px', float: 'left' }}
                    password={this.state.password}
                    onChange={this.handlePasswordChange}
                />
                <Button
                    type="primary"
                    shape="round"
                    onClick={this.handleBtnClick}

                >确认</Button>
            </Fragment>
        )
    }

    handleEmailChange (e) {
        const value = e.target.value
        this.setState(
            () => ({
                email: value
            }
            ))
    }

    handlePasswordChange (e) {
        const value = e.target.value
        this.setState(
            () => ({
                password: value
            }))
    }

    handleBtnClick () {
        const storage = window.localStorage;
        let token=storage.getItem('token')


        const headers = {
            'authorization': 'Bearer ' + token
        }
        console.log(headers)

        this.setState((prevState) => {
            // 判断输出是否为空
            if (true) {
                let todoInfo = {
                    Name: prevState.name,
                    Thing: '学习',
                    achieved: true
                }

                axios.post('http://localhost:3001/user/vertify', todoInfo, { headers: headers }).then((res) => {
                    console.log(res.data)
                }).catch(() => { console.log('error') })


                return console.log(prevState.email, prevState.password)
            }

        })

    }
}
export default Login