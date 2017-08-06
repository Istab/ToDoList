import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlexField from './flexField';
import './tasklist.css';

export default class Tasklist extends Component {
  constructor(props) {
	  super(props);
	  this.addListItem = this.addListItem.bind(this);
	  this.demoteListItem = this.demoteListItem.bind(this);
	  this.toggleListItem = this.toggleListItem.bind(this);
	  this.promoteListItem = this.promoteListItem.bind(this);
	  this.removeListItem = this.removeListItem.bind(this);
	  this.renderList = this.renderList.bind(this);
	  this.state = {list: props.list, name: props.name}
  }
  
  addListItem(itemName) {
	var list = this.state.list;
	list.push({name: itemName, done: false});
	this.setState({list: list});
  }
  
  demoteListItem(item) {
	var list = this.state.list;
	var index = list.indexOf(item);
	var nextItem = list[index+1];
	list[index+1]=item;
	list[index]=nextItem;
	this.setState({list: list});
  }
  
  toggleListItem(item) {
	var list = this.state.list;
	list[list.indexOf(item)] = {name: item.name, done: !item.done};
	this.setState({list: list});
  }
  
  promoteListItem(item) {
	var list = this.state.list;
	var index = list.indexOf(item);
	var previousItem = list[index-1];
	list[index-1]=item;
	list[index]=previousItem;
	this.setState({list: list});
  }
  
  removeListItem(item) {
	var list = this.state.list;
	var index = list.indexOf(item);
	if(index===-1) {return }
	list.splice(index,1);
	this.setState({list: list});
  }
  
  renameItem(index, newName) {
	var list = this.state.list;
	list[index].name=newName;
	this.setState({list: list});
  }
  
  renderList() {
	if(this.state.list.length===0) {
		return (<span>The list is empty</span>)
	}
	return (this.state.list.map((item, index) => 
		<div className='listItem' key={`${index}-${item.name}`}>
		  {item.done ?
		  <input type='button' value='X' onClick={() => this.toggleListItem(item)}/> :
		  <input type='button' value='✔' onClick={() => this.toggleListItem(item)}/>}
		  <div className='itemName'>
		  {item.done ?
		  <strike>{item.name}</strike> : <FlexField text={item.name} onChange={(newName)=>this.renameItem(index,newName)}/>}
		  </div>
		  {index!==0 && <input type='button' value='^' onClick={() => this.promoteListItem(item)}/>}
		  {index!==this.state.list.length-1 && <input type='button' value='v' onClick={() => this.demoteListItem(item)}/>}
		  <input type='button' value='-' onClick={() => this.removeListItem(item)}/>
		</div>
	  )
	)
  }
  
  render() {
    return (
      <div className='tasklist'>
	    <br/>
		<FlexField text={this.state.name}/>
		<div className='list'>
		  {this.renderList()}
		</div>
		<form onSubmit={
			(e) => {
				e.preventDefault();
				this.addListItem(document.getElementById('new-item').value);
			}
		}>
		  <input id='new-item' type='text' name='new item' placeholder='Add New Item'/>
		  <input type='button' value='+' onClick={() => this.addListItem(document.getElementById('new-item').value)}/>
		</form>
	  </div>
    );
  }
}

Tasklist.defaultProps = {
	list: [],
}
Tasklist.propTypes = {
	name: PropTypes.string.isRequired,
	list: PropTypes.array,
}