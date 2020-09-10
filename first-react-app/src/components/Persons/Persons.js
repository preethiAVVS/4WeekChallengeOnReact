import React, {Component} from 'react';
import Person from './Person/Person';
// const persons = (props) => {
    class Persons extends Component {
        
        // static getDerivedStateFromProps(props, state) {
        //     console.log("get derived");
        //     return state;
        // }

        shouldComponentUpdate(nextProps, nextState) {
            console.log("shouldComponentUpdate");
            //return true;
            //performance optimization
            if (nextProps.persons !== this.props.persons) {
                return true;
            } else {
                return false;
            }
        }

        getSnapshotBeforeUpdate(prevProps, prevState) {
            console.log("getSnapshotBeforeUpdate");
            return {mesaage: 'Snapshot' };
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            console.log("componentDidUpdate");
            console.log(snapshot);
        }

        componentWillUnmount() {
            console.log("Persosn, componentWillUnmount");
        }

        render() {
            console.log("persons");
            return this.props.persons.map((person, index) => {
                return <Person name={person.name}  key={person.Id} click={() => this.props.clicked(index)
                }
                  age={person.age}
                  change={(event) => this.props.changed(event, person.Id)}
                  isAuth={this.props.authentication}
                  ></Person>
              })
        }    
}
export default Persons;