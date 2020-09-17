import React, { Component, Fragment } from 'react';
import TodoItems from "./TodoItems";
import "../css//TodoList.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faTrash,faCircle,faCheckCircle } from '@fortawesome/free-solid-svg-icons'

library.add(far,faTrash,faCircle,faCheckCircle)

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.achieveItem = this.achieveItem.bind(this)
    this.setUpdate = this.setUpdate.bind(this)
  }

  addItem (e) {
    if (this._inputElement.value !== '') {
      let newItem = {
        text: this._inputElement.value,
        key: Date.now(),
        completed: false
      };

      this.setState((prevState) => {
        return {
          items: [...prevState.items, newItem]
        };
      });
    }
    this._inputElement.value = "";

    e.preventDefault();
  }

  achieveItem (key) {
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
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
        return item.text = text
      }
      return null
    })
    this.setState({
      items: items
    })
  }

  render () {
    return (
      <Fragment>
        <div className="todoListMain">
          <div className="app">
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
              achieve={this.achieveItem}
              setUpdate={this.setUpdate}
            ></TodoItems>
          </div>
        </div>
      </Fragment>

    );
  }
}

export default Todo;