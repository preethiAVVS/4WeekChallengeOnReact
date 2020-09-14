import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../../src/axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICE = {
    salad: 0.5,
    meat: 0.8,
    cheese: 0.4,
    bacon: 0.9
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get("/ingredients.json").then(response => {
            this.setState({ ingredients: response.data });
        }).catch(error => {
            this.setState({error: true});
        })
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => { return sum + el }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchasecontinueHandler = () => {
        this.setState({ loading: true });
        const post = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "PREETHI",
                address: {
                    street: "Chinna market",
                    zipcode: "533002",
                    country: "india"
                },
                email: "test@test.com"
            },
            deliverymethod: "fastest"
        }
        axios.post("/orders.json", post).then(response => {
            this.setState({
                loading: false,
                purchasing: false
            });
        }).catch(error => {
            this.setState({ loading: false, purchasing: false });
        });
    }



    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngre = { ...this.state.ingredients };
        updatedIngre[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngre,
            totalPrice: newPrice
        });
        this.updatePurchasable(updatedIngre);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngre = { ...this.state.ingredients };
        updatedIngre[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            ingredients: updatedIngre,
            totalPrice: newPrice
        });
        this.updatePurchasable(updatedIngre);
    }
    render() {
        const disabledMode = { ...this.state.ingredients }
        for (let key in disabledMode) {
            disabledMode[key] = disabledMode[key] <= 0;
        }


        let ordersummary = null;
        let burger = this.state.error ? <p>Ingredients cannot load !!</p>: <Spinner></Spinner>;
        if (this.state.ingredients) {
            burger = (<Auxiliary>
                <Burger
                    ingredients={this.state.ingredients}></Burger>

                <BuildControls
                    addIng={this.addIngredientHandler}
                    removeIng={this.removeIngredientHandler}
                    disableMode={disabledMode}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.purchaseHandler}
                ></BuildControls>
            </Auxiliary>

            );
            ordersummary = <OrderSummary ingredients={this.state.ingredients}
            cancelpurchase={this.purchaseCancelHandler}
            continuepurchase={this.purchasecontinueHandler}
            price={this.state.totalPrice}
        ></OrderSummary>;
        }
        if (this.state.loading) {
            console.log("loading");
            ordersummary = <Spinner></Spinner>
        }

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

export default withErrorHandler(BurgerBuilder, axios);