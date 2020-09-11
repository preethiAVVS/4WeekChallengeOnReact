import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    meat: 0.8,
    cheese: 0.4,
    bacon: 0.9
}
class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 0,
            cheese: 0,
            meat:0,
            bacon: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngre = { ...this.state.ingredients};
        updatedIngre[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngre,
            totalPrice: newPrice
        });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngre = { ...this.state.ingredients};
        updatedIngre[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            ingredients: updatedIngre,
            totalPrice: newPrice
        });
    }
    render() {
        const disabledMode = {...this.state.ingredients}
        for (let key in disabledMode) {
            disabledMode[key] = disabledMode[key] <= 0;
        }
        return (
            <Auxiliary>
                <Burger 
                ingredients={this.state.ingredients}></Burger>
            <div>
            <BuildControls
            addIng={this.addIngredientHandler} 
            removeIng={this.removeIngredientHandler}
            disableMode={disabledMode}
            price={this.state.totalPrice}></BuildControls>
            </div>
            </Auxiliary>
        )
    }

}

export default BurgerBuilder;