import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, } from 'antd';
import axios from 'axios'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'light',
            password: '123456',
            checkPassword: '123456',
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.CheckPasswordChange = this.CheckPasswordChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
       
    }
    render () {

        return (
            <Fragment>
                <div>注册</div>
                <Input
                    id='name'
                    placeholder="请输入用户名"
                    style={{ width: '200px', marginRight: '20px', float: 'left' }}
                    name={this.state.name}
                    onChange={this.handleNameChange}
                />
                <Input
                    id='password'
                    placeholder="请输入密码"
                    style={{ width: '200px', marginRight: '20px', float: 'left' }}
                    password={this.state.password}
                    onChange={this.handlePasswordChange}
                />
                <Input
                    id='checkPassword'
                    placeholder="确认密码"
                    style={{ width: '200px', marginRight: '20px', float: 'left' }}
                    checkPassword={this.state.checkPassword}
                    onChange={this.CheckPasswordChange}
                />
                <Button
                    type="primary"
                    shape="round"
                    onClick={this.handleBtnClick}

                >确认               </Button>

            </Fragment>
        )

    }



    handleNameChange (e) {
        const value = e.target.value
        this.setState(
            () => ({
                name: value
            }))
    }

    handlePasswordChange (e) {
        const value = e.target.value
        this.setState(
            () => ({
                password: value
            }))
    }
    CheckPasswordChange (e) {
        const value = e.target.value
        this.setState(
            () => ({
                checkPassword: value
            }))
    }

    handleBtnClick () {
        this.setState((prevState) => {
            const storage = window.localStorage;
            axios.post('http://localhost:3001/login',).then((res) => {
                storage.setItem("token", res.data.token)
            }).catch(() => { console.log('error') })

            let token=storage.getItem('token')
            
            const headers = {
                'authorization': 'Bearer ' + token
            }
            console.log(headers)
            // 判断输出是否为空
            if (true) {

                let userInfo = {
                    Name: prevState.name,
                    Password: prevState.password,
                }
                axios.post('http://localhost:3001/user/test', userInfo, { headers: headers }).then((res) => {
                    console.log(res.data)
                }).catch(() => { console.log('error') })
                return console.log(prevState.name, prevState.password, prevState.checkPassword)
            }

        })
    }

}
export default Register