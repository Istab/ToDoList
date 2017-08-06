import React, { Component } from 'react';
import Tasklist from './tasklist';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2><span className='red-text'>IST</span>oDo</h2>
		  <h4>By Istabraq Almusally</h4>
        </div>
        <Tasklist name="My To-Do List"/>
      </div>
    );
  }
}

export default App;
