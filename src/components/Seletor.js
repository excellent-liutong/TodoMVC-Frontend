import React, { Component, Fragment } from 'react';
import '../css/Seletor.css';


class Seletor extends Component {

  allItems () {
    this.props.allItems()
  }

  activeItems () {
    this.props.activeItems()
  }

  completedItems () {
    this.props.completedItems()
  }

  deleteCompletedItems () {
    this.props.deleteCompletedItems()
  }

  render () {
    let todoEntries = this.props.entries;
    let flag=false
    todoEntries.map((item) => {
      if (item.completed === true) {
        return flag = true
      }
      return null
    })
    return (

      <Fragment >
        <div id="seletor-container">
          <button 
          onClick={() => { this.allItems() }}
          >全部事项</button>
          <button onClick={() => { this.activeItems() }}>待完成</button>
          <button onClick={() => { this.completedItems() }}>已完成</button>
          <button 
          onClick={() => { this.deleteCompletedItems() }} 
          style={{ display: flag ? 'block' : 'none' , fontSize:'11px',backgroundColor: '#f37a5a'}}
           >删除已完成</button>
        </div>
      </Fragment>)
  }
}

export default Seletor;