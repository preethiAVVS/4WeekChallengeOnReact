import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientsummary = Object.keys(props.ingredients)
    .map(igKey => {
    return (<li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
        </li>)
    });
    return (<Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientsummary}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={props.cancelpurchase}>CANCEL</Button>
        <Button btnType="Success" clicked={props.continuepurchase}>CONTINUE</Button>

    </Auxiliary>)
}

export default orderSummary;