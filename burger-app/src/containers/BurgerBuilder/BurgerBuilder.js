import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../../src/axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";

// const INGREDIENTS_PRICE = {
//     salad: 0.5,
//     meat: 0.8,
//     cheese: 0.4,
//     bacon: 0.9
// }
class BurgerBuilder extends Component {
    state = {
    //    ingredients: null,
    //    totalPrice: 4,
    //    purchasable: false,
        purchasing: false,
    //    loading: false,
    //    error: false
    }

    componentDidMount() {
        // axios.get("/ingredients.json").then(response => {
        //     this.setState({ ingredients: response.data });
        // }).catch(error => {
        //     this.setState({error: true});
        // })
        console.log(this.props); 
        this.props.onInitIngredients();
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => { return sum + el }, 0);
            return sum > 0;
    //    this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true });
        } else {
            this.props.setAuthRedirect("/checkout");
            this.props.history.push("/auth");
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
     purchasecontinueHandler = () => {
    //     const queryparams = [];
    //     for (let i in this.state.ingredients) {
    //         queryparams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     queryparams.push('price=' + this.state.totalPrice);
    //     const queryString = queryparams.join("&");
    //    // this.props.history.push("/checkout");
    //    this.props.history.push({
    //        pathname: "/checkout",
    //        search: "?" + queryString
    //    });
    console.log(this.props.ings);
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }



    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngre = { ...this.state.ingredients };
    //     updatedIngre[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         ingredients: updatedIngre,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchasable(updatedIngre);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount - 1;
    //     const updatedIngre = { ...this.state.ingredients };
    //     updatedIngre[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceAddition;
    //     this.setState({
    //         ingredients: updatedIngre,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchasable(updatedIngre);
    // }
    render() {
        const disabledMode = { ...this.props.ings }
        for (let key in disabledMode) {
            disabledMode[key] = disabledMode[key] <= 0;
        }


        let ordersummary = null;
        let burger = this.props.error ? <p>Ingredients cannot load !!</p>: <Spinner></Spinner>;
        if (this.props.ings) {
            burger = (<Auxiliary>
                <Burger
                    ingredients={this.props.ings}></Burger>

                <BuildControls
                    isAuth={this.props.isAuth}
                    addIng={this.props.onIngredientAdded}
                    removeIng={this.props.onIngredientRemoved}
                    disableMode={disabledMode}
                    price={this.props.price}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    order={this.purchaseHandler}
                ></BuildControls>
            </Auxiliary>

            );
            ordersummary = <OrderSummary ingredients={this.props.ings}
            cancelpurchase={this.purchaseCancelHandler}
            continuepurchase={this.purchasecontinueHandler}
            price={this.props.price}
        ></OrderSummary>;
        }
        // if (this.state.loading) {
        //     console.log("loading");
        //     ordersummary = <Spinner></Spinner>
        // }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}

            </Auxiliary>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirectpath
    }
}

const dispatchProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        setAuthRedirect: (path) => dispatch(actions.authRedirect(path))
    }
}

export default connect(mapStateToProps, dispatchProps)(withErrorHandler(BurgerBuilder, axios));