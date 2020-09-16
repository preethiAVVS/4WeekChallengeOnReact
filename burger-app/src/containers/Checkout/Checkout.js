import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        price: 0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        console.log(query.entries());
         for (let param of query.entries()) {
             if(param[0] === "price") {
                 price = param[1];
             }else {
                ingredients[param[0]] = +param[1];  //['salad', '1']
             }
         }
         this.setState({ ingredients: ingredients, price: price });
    }
    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
    render() {
        return (
            <div>
            <CheckoutSummary ingredients={this.state.ingredients} cancelpurchase={this.cancelHandler}
                continuepurchase={this.continueHandler}></CheckoutSummary>
                <Route path={this.props.match.path + "/contact-data"} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.price} {...props}></ContactData>)}/>
            </div>
        )
    }
}
export default Checkout;