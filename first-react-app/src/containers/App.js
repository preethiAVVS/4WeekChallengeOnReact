import React, { Component, useState } from 'react';
import './App.css';
import styled from 'styled-components';
// import Radium, {StyleRoot} from 'radium';
import Persons from '../components/Persons/Persons';
import ErrorBoundary from '../components/ErrorBoundary/ErroBoundary';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/AuthContext';


import cssclass from './App.css';

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

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("get derived");
    return state;
  }

  componentDidMount() {
    console.log("mount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("App shouldComponentUpdate");
    return true;
  }
  componentDidUpdate() {
    console.log("App componentDidUpdate");
  }

  state = {
    persons: [
      { Id: 1, name: "Mark", age: 34 },
      { Id: 3, name: "John", age: 23 },
      { Id: 5, name: "Luce", age: 30 }
    ],
    showPersons: false,
    removeCockpit: false,
    changeCounter: 0,
    isAuth: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { Id: 1, name: newName, age: 44 },
        { Id: 3, name: "John", age: 28},
        { Id: 5, name: "Luce King", age: 30}
      ]
    })
  }

  nameChangeHandler = (event, personId) => {
    const personIndex = this.state.persons.findIndex(p => p.Id === personId);
    const requiredperson = { ... this.state.persons[personIndex] };
    requiredperson.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = requiredperson;
    // this.setState({ persons: persons });

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter : prevState.changeCounter + 1
      }
    });
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

  authcheckHandler =() =>  {
    this.setState({isAuth: true});
  }


  render() {
    console.log("render");

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
    let btnClass = [cssclass.Button];
    if (this.state.showPersons) {
      persons = (<div>
        {/* {this.state.persons.map((person, index) => {
          return <ErrorBoundary key={person.Id}><Person name={person.name} click={() => this.deletepersonHandler(index)
          }
            age={person.age}
            change={(event) => this.nameChangeHandler(event, person.Id)}
            ></Person></ErrorBoundary>
        })} */}

        <Persons 
        persons={this.state.persons}
        clicked={this.deletepersonHandler}
        changed={this.nameChangeHandler}
        authentication={this.state.isAuth}></Persons>

      </div>)

      btnClass.push(cssclass.Red);

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


    // const classes = [];
    // if (this.state.persons.length <= 2) {
    //   classes.push(cssclass.red);
    // }

    // if (this.state.persons.length <= 1) {
    //   classes.push(cssclass.bold);
    // }

    return (
      // <StyleRoot>
      //<div className={cssclass.App}>
      // <WithClass class={cssclass.App}>
      <Auxiliary>
        <button onClick={() => this.setState({removeCockpit: true})}>Remove Cockpit</button>

        <AuthContext.Provider 
        value={{
          authenticated: this.state.isAuth, 
          login:this.authcheckHandler}}
          >
        {!this.state.removeCockpit ?      <Cockpit
        title={this.props.appTitle}
        personslength={this.state.persons.length}
        showpersons={this.state.showPersons}
        clicked={this.toggleHandler}
        ></Cockpit> : null}
   


        {/* <h1>This is my first react App!!</h1>
        <p className={classes.join(' ')}> It's working!!</p>
        <button className={btnClass.join(' ')} onClick={this.toggleHandler}>Switch Name</button> */}

        {/* <button style={style} onClick={this.toggleHandler}>Switch Name</button> */}

        {/* <StyledButton alt={this.state.showPersons} onClick={this.toggleHandler}> Switch Name </StyledButton> */}


        {persons /* { this.state.showPersons ?  <div>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={() => this.switchNameHandler('Johnny')}
          change={this.nameChangeHandler}>My Hobbies: Playing</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
        </div> : null } */}
      {/* </div> */}

      </AuthContext.Provider>
      </Auxiliary>
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
export default WithClass(App, cssclass.App);
