import React from 'react';
import classes from "./Person.css";
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

const person = (props) => {
    const style = {
        'media(min-width: 500px)': {
            width: '450px'
        }
    }

    const rnd = Math.random();
    if (rnd >0.7) {
        throw new Error('something went wrong!!');
    }

    return  <div className={classes.Person} style={style}>
    
    <p onClick={props.click}>I am {props.name} and {props.age} years old!!</p>
    <p>{props.children}</p>
    <input type="text" onChange={props.change} value={props.name} />
    </div>
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
// export default Radium(person);
export default person;