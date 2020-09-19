import React, { Component, Fragment } from 'react';
import TodoItems from "./TodoItems";
import Seletor from './Seletor'
import "../css//TodoList.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'


import { updateToBackEnd } from './utils/axios'

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





  addItem (e) {
    if (this._inputElement.value !== '') {
      let newItem = {
        text: this._inputElement.value,
        key: Date.now(),
        completed: false,
        display: 'block'
      };

      // 同步后端
      let todoInfo = {
        UserID: 'light',
        TodoThing: newItem.text,
        Completed: newItem.completed
      };
      updateToBackEnd('createTodo', todoInfo)

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
          UserID: 'light',
          ItemID: 'f54cd3e2-2e10-42a7-b442-74663f043eac',
          Completed: !item.completed
        };
        updateToBackEnd('updateTodo', todoInfo)

        return item.completed = !item.completed
      }
      return null
    })
    this.setState({
      items: items
    })
  }


  deleteItem (key) {
    let filteredItems = this.state.items.filter((item) => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems
    })
  }

  setUpdate (text, key) {
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        // 同步后端
        let todoInfo = {
          UserID: 'light',
          ItemID: '',
          Completed: item.completed,
          TodoThing: text
        };
        updateToBackEnd('updateTodo', todoInfo)
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
    let filteredItems = this.state.items.filter((item) => {
      return item.completed === false
    })
    this.setState({
      items: filteredItems
    })
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