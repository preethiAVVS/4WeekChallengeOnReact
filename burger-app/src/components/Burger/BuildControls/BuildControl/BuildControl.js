import React from 'react';
import classes from "./BuildControl.module.css";

const BuildControl = (props) => {

    return (
        <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
        onClick={props.removeIng} 
        className={classes.Less}
        disabled={props.disable}
        >Less</button>
        <button onClick={props.addIng} className={classes.More}>More</button>
    </div>

    )

}
export default BuildControl;