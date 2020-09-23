import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import {connect} from "react-redux";
class Checkout extends Component {
    // state = {
    //     ingredients: {
    //         salad: 1,
    //         meat: 1,
    //         cheese: 1,
    //         bacon: 1
    //     },
    //     price: 0
    // }
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     console.log(query.entries());
    //      for (let param of query.entries()) {
    //          if(param[0] === "price") {
    //              price = param[1];
    //          }else {
    //             ingredients[param[0]] = +param[1];  //['salad', '1']
    //          }
    //      }
    //      this.setState({ ingredients: ingredients, price: price });
    // }
    cancelHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
    render() {
        return (
            <div>
            <CheckoutSummary ingredients={this.props.ings} cancelpurchase={this.cancelHandler}
                continuepurchase={this.continueHandler}></CheckoutSummary>
                <Route path={this.props.match.path + "/contact-data"} 
                component={ContactData}/>
                {/* render={(props) => (<ContactData ingredients={this.props.ings} totalPrice={this.props.price} {...props}></ContactData>)}/> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);