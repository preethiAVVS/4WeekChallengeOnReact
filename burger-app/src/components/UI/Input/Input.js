import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
    let inputElemnet = null;
    let inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldvalidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case "input":
            inputElemnet = <input onChange={props.changed} className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} />
            break;
        case "textarea":
            inputElemnet = <textarea onChange={props.changed} className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} />
            break;
        case "select":
            inputElemnet = (<select onChange={props.changed} className={inputClasses.join(" ")} value={props.value}>
                {props.elementConfig.options.map(option => {
                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                })}
            </select>)
            break;
        default:
            inputElemnet = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElemnet}
        </div>
    )
}
export default Input;