import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  render () {
    return (
      <div className="App">
        <h1>This is my first react App!!</h1>
        <Person name="Mark" age="34"/>
        <Person name="John" age="23">My Hobbies: Playing</Person>
        <Person name="Luce" age="30"/>
      </div>
    )
 // return React.createElement('div', null, React.createElement('h1', { className: 'App'}, 'This is my first react App!!'))
  }
  return 
}

export default App;
