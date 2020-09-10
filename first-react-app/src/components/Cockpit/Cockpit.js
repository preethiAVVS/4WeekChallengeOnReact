import React, { useEffect, useRef, useContext } from 'react';
import cssclass from './Cockpit.css';
import AuthContext from '../../context/AuthContext';
const Cockpit = (props) => {
    const toggleRef = useRef(null);

    const authContext = useContext(AuthContext);

    useEffect((props) => {
        console.log("1st useeffet");
        //http request

        // setTimeout(() => {
        //     alert('saved data to cloud'); 
        // }, 1000);
        toggleRef.current.click();
        return () => {
            console.log("clean up in use effect when cockpit is removed");
        }
    }, [])

    useEffect((props) => {
        console.log("2nd useeffet");
        //http request
    })

    const classes = [];
    let btnClass = [cssclass.Button];
    if (props.showpersons) {
        btnClass.push(cssclass.Red);
    }


    if (props.personslength <= 2) {
      classes.push(cssclass.red);
    }

    if (props.personslength <= 1) {
      classes.push(cssclass.bold);
    }

    return <div>
        <h1>{props.title}</h1>
        <p className={classes.join(' ')}> It's working!!</p>
        <button ref={toggleRef}
        className={btnClass.join(' ')} onClick={props.clicked}>Switch Name</button>
        {/* <AuthContext.Consumer>
            {context => <button onClick={context.login}>Log In</button>}
        </AuthContext.Consumer> */}
        <button onClick={authContext.login}>Log In</button>
        
    </div>
}
export default React.memo(Cockpit);