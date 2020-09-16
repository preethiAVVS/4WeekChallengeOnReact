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
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        console.log(query.entries());
         for (let param of query.entries()) {

         ingredients[param[0]] = +param[1];  //['salad', '1']
         }
         this.setState({ ingredients: ingredients });
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
                <Route path={this.props.match.path + "/contact-data"} component={ContactData}/>
            </div>
        )
    }
}
export default Checkout;