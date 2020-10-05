import React from 'react';
import classes from "./BuildControls.module.css";
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'}
]
const BuildControls = (props) => {
    return <div className={classes.BuildControls}>
        <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
       {controls.map(ctrl => (
           <BuildControl 
           key={ctrl.label} 
           label={ctrl.label} 
           addIng={() => props.addIng(ctrl.type)}
           removeIng={() => props.removeIng(ctrl.type)}
           disable={props.disableMode[ctrl.type]}
           ></BuildControl>
       ))}
       <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.order}>{props.isAuth ? 'ORDER NOW': 'SIGN UP TO ORDER'}</button>
    </div>

}
export default BuildControls;