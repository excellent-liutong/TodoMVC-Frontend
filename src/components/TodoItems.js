import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../css//ListItem.css";


class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this)
  }

  delete (key) {
    this.props.delete(key)
  }

  completed (key) {
    this.props.completed(key)
  }

  createTasks (item) {
    return (
      <div key={item.key} style={{ display: item.display }}>
        <div className='circle'>
          <FontAwesomeIcon
            className='faicons'
            icon={["far", item.completed ? "check-circle" : "circle"]}
            onClick={() => { this.completed(item.key) }} />
        </div>
        <li className={item.completed ? 'achieved' : ''}
        >
          <input
            type="text"
            id={item.key}
            value={item.text}
            style={{ textDecoration: item.completed ? 'line-through' : '' }}
            onChange={
              (e) => {
                this.props.setUpdate(e.target.value, item.key)
              }}
          ></input>
          <span className='trash'>
            <FontAwesomeIcon
              className='faicons'
              icon='trash'
              onClick={() => { this.delete(item.key) }} />
          </span>
        </li>
      </div>
    )
  }

  render () {
    let todoEntries = this.props.entries;
    let ListItems = todoEntries.map(this.createTasks)
    return (
      <ul className="theList">
        <FlipMove duration={200} easing="ease-in-out">
          {ListItems}
        </FlipMove>
      </ul>
    )
  }
}

export default TodoItems;