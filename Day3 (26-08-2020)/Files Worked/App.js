import React, { Component, useState } from 'react';
import './App.css';
import styled from 'styled-components';
// import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';

const StyledButton = styled.button`
      background-color: ${props => props.alt ? 'red': 'green'};
      color: white;
      font: inherit;
      border: 1px solid blue;
      padding: 8px;
      cursor: pointer;
        &:hover {
          background-color: lightgreen;
          color: black
        }
`
// return React.createElement('div', null, React.createElement('h1', { className: 'App'}, 'This is my first react App!!'))
class App extends Component {

  state = {
    persons: [
      { name: "Mark", age: "34" },
      { name: "John", age: "23" },
      { name: "Luce", age: "30" }
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { Id: 1, name: newName, age: "34" },
        { Id: 3, name: "John", age: "28" },
        { Id: 5, name: "Luce King", age: "30" }
      ]
    })
  }

  nameChangeHandler = (event, personId) => {
    const personIndex = this.state.persons.findIndex(p => p.Id === personId);
    const requiredperson = { ... this.state.persons[personIndex] };
    requiredperson.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = requiredperson;
    this.setState({ persons: persons });
    // this.setState({
    //   persons: [
    //     { name: "Mark", age: "34" },
    //     { name: event.target.value, age: "28" },
    //     { name: "Luce King", age: "30" }
    //   ]
    // })
  }

  toggleHandler = () => {
    const persons = this.state.showPersons;
    this.setState({
      showPersons: !persons
    });
  }

  deletepersonHandler = (personindex) => {
    const personslist = this.state.persons;
    personslist.splice(personindex, 1);
    this.setState({
      persons: personslist
    })

  }


  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;
    if (this.state.showPersons) {
      persons = (<div>
        {this.state.persons.map((person, index) => {
          return <Person name={person.name} click={() => this.deletepersonHandler(index)
          }
            age={person.age}
            change={(event) => this.nameChangeHandler(event, person.Id)}
            key={person.Id}></Person>
        })}
      </div>)


      // persons = (<div>
      //   <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
      //   <Person 
      //     name={this.state.persons[1].name} 
      //     age={this.state.persons[1].age}
      //     click={() => this.switchNameHandler('Johnny')}
      //     change={this.nameChangeHandler}>My Hobbies: Playing</Person>
      //   <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      //   </div>)
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // };

    }


    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      // <StyleRoot>
      <div className="App">
        <h1>This is my first react App!!</h1>
        <p className={classes.join(' ')}> It's working!!</p>

        {/* <button style={style} onClick={this.toggleHandler}>Switch Name</button> */}

        <StyledButton alt={this.state.showPersons} onClick={this.toggleHandler}> Switch Name </StyledButton>


        {persons /* { this.state.showPersons ?  <div>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={() => this.switchNameHandler('Johnny')}
          change={this.nameChangeHandler}>My Hobbies: Playing</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
        </div> : null } */}
      </div>
      // </StyleRoot>
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

// export default Radium(App);
export default App;
