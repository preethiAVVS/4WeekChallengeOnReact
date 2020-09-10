import React, {Component} from 'react';
import classes from "./Person.css";
import Auxiliary from '../../../hoc/Auxiliary';
import WithClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/AuthContext';
//import styled from 'styled-components';
// import Radium from 'radium';

// const StyledDiv = styled.div`
//             width: 60%;
//             margin: 16px auto;
//             border: 1px solid #eee;
//             box-shadow: 0px 2px 3px #ccc;
//             padding: 16px;
//             text-align: center;
//             media(min-width: 500px) {
//                 width: '450px'
//             }
// `

// const person = (props) => {
    class Person extends Component {
        constructor(props) {
            super(props);
            this.inputElementRef = React.createRef();
        }

        static contextType = AuthContext;
    // const style = {
    //     'media(min-width: 500px)': {
    //         width: '450px'
    //     }
    // }

    // const rnd = Math.random();
    // if (rnd >0.7) {
    //     throw new Error('something went wrong!!');
    // }
    componentDidMount() {
       // this.inputElement.focus();
        this.inputElementRef.current.focus();
    }
render() {
    console.log("person");
    return  (<Auxiliary>

         {/* {this.props.isAuth ? <p>Authenticated!!</p> : <p>Please Log in</p>} */}

         {/* <AuthContext.Consumer>{context => context.authenticated ? <p>Authenticated!!</p> : <p>Please Log in</p>}</AuthContext.Consumer> */}
         {this.context.authenticated ? <p>Authenticated!!</p> : <p>Please Log in</p>}
    <p key="p1" onClick={this.props.click}>I am {this.props.name} and {this.props.age} years old!!</p>
    <p key="p2">{this.props.children}</p>
    <input 
    key="p3" 
    type="text" 
    onChange={this.props.change} 
    ref={this.inputElementRef}
   // ref={(inputEl) => {this.inputElement = inputEl}}
    value={this.props.name} />
    </Auxiliary>);
   
}
 // <div className={classes.Person} >
  // </div>

    // return <StyledDiv>


    //     <p onClick={props.click}>I am {props.name} and {props.age} years old!!</p>
    //     <p>{props.children}</p>
    //     <input type="text" onChange={props.change} value={props.name} />

    // </StyledDiv>

    /* <div className="Person" style={style}>
    
    <p onClick={props.click}>I am {props.name} and {props.age} years old!!</p>
    <p>{props.children}</p>
    <input type="text" onChange={props.change} value={props.name} />
    </div> */
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    change: PropTypes.func
}
// export default Radium(person);
export default WithClass(Person,classes.Person);