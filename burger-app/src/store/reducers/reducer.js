import * as actionTypes from "../actions/actions";

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4
}
const INGREDIENTS_PRICE = {
    salad: 0.5,
    meat: 0.8,
    cheese: 0.4,
    bacon: 0.9
}

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingName]   
            };
        default:
            return state;
    }
    
}

export default reducer;