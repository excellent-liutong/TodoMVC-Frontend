import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this)
  }
  createTasks (item) {
    return (<li key={item.key}
    ><input
      type="text"
      id={item.key}
      value={item.text}
      onChange={
        (e) => {
          this.props.setUpdate(e.target.value, item.key)
        }}
    ></input>
      <span>
        <FontAwesomeIcon
          className='faicons'
          icon='trash'
          onClick={() => { this.delete(item.key) }} />
      </span>
    </li>)
  }

  delete (key) {
    this.props.delete(key)
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