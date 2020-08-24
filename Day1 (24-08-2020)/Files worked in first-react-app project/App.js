import React, { Component, useState } from 'react';
import './App.css';
import Person from './Person/Person';


// return React.createElement('div', null, React.createElement('h1', { className: 'App'}, 'This is my first react App!!'))
class App extends Component { 

  state = {
    persons: [
      { name: "Mark", age: "34"},
      { name: "John", age: "23"},
      { name: "Luce", age: "30"}
    ]
  }
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: "34"},
        { name: "John", age: "28"},
        { name: "Luce King", age: "30"}
      ]
    })
  }

  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        { name: "Mark", age: "34"},
        { name: event.target.value, age: "28"},
        { name: "Luce King", age: "30"}
      ]
    })
  }
  render () {
    const style ={
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
  }
    return (
      <div className="App">
        <h1>This is my first react App!!</h1>
        <button style={style} onClick={this.switchNameHandler.bind(this, 'Manuellina')}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={() => this.switchNameHandler('Johnny')}
          change={this.nameChangeHandler}>My Hobbies: Playing</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
    )
  }


}
// const App = props => {
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       { name: "Mark", age: "34" },
//       { name: "John", age: "23" },
//       { name: "Luce", age: "30" }
//     ]
//   });

//   const switchNameHandler = () => {
//     setPersonsState({
//       persons: [
//         { name: "Mark Twain", age: "34" },
//         { name: "John", age: "28" },
//         { name: "Luce King", age: "30" }
//       ],
//       otherState: 'other value'
//     })
//   }
//   return <div className="App"> <h1>This is my first react App!!</h1>
//     <button onClick={switchNameHandler}>Switch Name</button>
//     <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
//     <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Playing</Person>
//     <Person name={personsState.persons[2].name} age={personsState.persons[2].age} /></div>
// }

export default App;
