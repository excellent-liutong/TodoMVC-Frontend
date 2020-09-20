import React, { Component, Fragment } from 'react';
import TodoItems from "./TodoItems";
import Seletor from './Seletor'
import "../css//TodoList.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


library.add(far, faTrash, faCircle, faCheckCircle)

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.completedItem = this.completedItem.bind(this)
    this.setUpdate = this.setUpdate.bind(this)
    this.showAllItems = this.showAllItems.bind(this)
    this.showActiveItems = this.showActiveItems.bind(this)
    this.showCompletedItems = this.showCompletedItems.bind(this)
    this.deleteCompletedItems = this.deleteCompletedItems.bind(this)
  }


  getAllItem () {
    if (this.props.user.loggedIn) {
      let todoInfo = {
        UserID: this.props.user.UserID,
      };

      axios.post('todo/getAllTodo', todoInfo)
        .then((res) => {
          console.log('获取用户所有todo')
          console.log(res.data.status)
          function compare (p) {
            return (m, n) => {
              return m[p] - n[p];
            }
          }
          res.data.status.sort(compare("Order"));


          res.data.status.map((item) => {
            let newItem = {
              TodoID: item.TodoID,
              text: item.TodoThing,
              completed: item.Completed,
              key: Date.now(),
              display: 'block'
            };


            this.setState((prevState) => {
              return {
                items: [...prevState.items, newItem]
              };
            }

            );
            return null
          })
          console.log(this.state.items)

        })
        .catch((err) => {
          console.log('todo获取失败')
        })
    }



  }


  addItem (e) {
    if (this._inputElement.value !== '') {
      let newItem = {
        text: this._inputElement.value,
        key: Date.now(),
        completed: false,
        display: 'block'
      };

      // 同步后端
      // const token = localStorage.getItem('token')
      let todoInfo = {
        UserID: this.props.user.UserID,
        TodoThing: newItem.text,
        Completed: newItem.completed
      };

      axios.post('todo/createTodo', todoInfo)
        .then((res) => {
          console.log('todo创建成功')
          console.log(res.data.status)
          newItem.TodoID = res.data.status.TodoID
        })
        .catch((err) => {
          console.log('todo创建失败')
          console.log(err.response.data.error)
          this.setState({ message: err.response.data.error })
        })


      this.setState((prevState) => {
        return {
          items: [...prevState.items, newItem]
        };
      });
    }
    this._inputElement.value = "";
    e.preventDefault();
  }


  completedItem (key) {
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        // 同步后端
        let todoInfo = {
          TodoID: item.TodoID,
          TodoThing: item.TodoThing,
          UserID: this.props.user.UserID,
          Completed: !item.completed
        };

        axios.post('todo/updateTodo', todoInfo)
          .then((res) => {
            console.log('todo已成功更新')
            console.log(res.data.status)
          })
          .catch((err) => {
            console.log('todo更新失败')
            console.log(err.response.data.error)
            this.setState({ message: err.response.data.error })
          })

        return item.completed = !item.completed
      }
      return null
    })
    this.setState({
      items: items
    })
  }


  deleteItem (key) {
    const items = this.state.items;
    let filteredItems = items.filter((item) => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems
    })
    items.map((item) => {
      if (item.key === key) {
        // 同步后端
        let todoInfo = {
          TodoID: item.TodoID,
          TodoThing: item.TodoThing,
          UserID: this.props.user.UserID,
          Completed: !item.completed
        };

        axios.post('todo/deleteTodo', todoInfo)
          .then((res) => {
            console.log('todo已成功删除')
            console.log(res.data)
          })
          .catch((err) => {
            console.log('todo删除失败')
            console.log(err.response.data.error)
            this.setState({ message: err.response.data.error })
          })

        return item.completed = !item.completed
      }
      return null
    })
  }

  setUpdate (text, key) {
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        // 同步后端
        let todoInfo = {
          TodoID: item.TodoID,
          TodoThing: text,
          UserID: this.props.user.UserID,
          Completed: !item.completed
        };

        axios.post('todo/updateTodo', todoInfo)
          .then((res) => {
            console.log('todo已成功更新')
            console.log(res.data.status)
          })
          .catch((err) => {
            console.log('todo更新失败')
            console.log(err.response.data.error)
            this.setState({ message: err.response.data.error })
          })

        return item.text = text
      }
      return null
    })
    this.setState({
      items: items
    })
  }

  showAllItems () {
    const items = this.state.items;
    items.map((item) => {
      return item.display = 'block'
    })
    this.setState({
      items: items
    })
  }

  showActiveItems () {
    const items = this.state.items;
    items.map((item) => {
      if (item.completed === false) {
        return item.display = 'block'
      }
      else {
        return item.display = 'none'
      }
    })
    this.setState({
      items: items
    })
  }

  showCompletedItems () {
    const items = this.state.items;
    items.map((item) => {
      if (item.completed === true) {
        return item.display = 'block'
      }
      else {
        return item.display = 'none'
      }
    })
    this.setState({
      items: items
    })
  }

  deleteCompletedItems () {
    const items = this.state.items;
    let filteredItems = items.filter((item) => {
      return item.completed === false
    })
    this.setState({
      items: filteredItems
    })
    items.map((item) => {
      if (item.completed === true) {
        // 同步后端
        let todoInfo = {
          TodoID: item.TodoID,
          TodoThing: item.TodoThing,
          UserID: this.props.user.UserID,
          Completed: !item.completed
        };

        axios.post('todo/deleteTodo', todoInfo)
          .then((res) => {
            console.log('todo已成功删除')
            console.log(res.data)
          })
          .catch((err) => {
            console.log('todo删除失败')
            console.log(err.response.data.error)
            this.setState({ message: err.response.data.error })
          })

        return item.completed = !item.completed
      }
      return null
    })



  }

  clearUserItems () {
    if (!this.props.user.loggedIn) {
      console.log('clear')
      this.setState({
        items: []
      })
    }
  }

  componentDidMount () {

    this.getAllItem()
    this.clearUserItems()
  }

  render () {
    if (this.state.user) {
      console.log(this.state.user)
    }

    return (
      <Fragment>
        <div className="todoListMain">
          <header>
            <form id="to-do-form" onSubmit={this.addItem} >
              <input
                ref={(a) => { this._inputElement = a }}
                placeholder="请输入待办事项">
              </input>
              <button type="submit">添加</button>
            </form>
          </header>

          <TodoItems
            entries={this.state.items}
            delete={this.deleteItem}
            completed={this.completedItem}
            setUpdate={this.setUpdate}
          ></TodoItems>
          <Seletor
            entries={this.state.items}
            allItems={this.showAllItems}
            activeItems={this.showActiveItems}
            completedItems={this.showCompletedItems}
            deleteCompletedItems={this.deleteCompletedItems}
          ></Seletor>
        </div>
      </Fragment>

    );
  }
}

export default Todo;