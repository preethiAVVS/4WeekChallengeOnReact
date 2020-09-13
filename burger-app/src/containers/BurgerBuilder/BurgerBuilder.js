import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICE = {
    salad: 0.5,
    meat: 0.8,
    cheese: 0.4,
    bacon: 0.9
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => { return sum + el }, 0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchasecontinueHandler = () => {
       alert("You can continue");
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
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    cancelpurchase={this.purchaseCancelHandler}
                    continuepurchase={this.purchasecontinueHandler}
                    price={this.state.totalPrice}
                    ></OrderSummary>
                </Modal>
                <Burger
                    ingredients={this.state.ingredients}></Burger>
                <div>
                    <BuildControls
                        addIng={this.addIngredientHandler}
                        removeIng={this.removeIngredientHandler}
                        disableMode={disabledMode}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.purchaseHandler}
                        ></BuildControls>
                </div>
            </Auxiliary>
        )
    }

}

export default BurgerBuilder;