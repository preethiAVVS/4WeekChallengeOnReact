import * as actionTypes from "../actions";
const initialState = {
    results: []
}

//Reducer
const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.STORE:
            return{
                ...state,
                results: state.results.concat({ id: new Date(), value: action.value})
            }
        case actionTypes.DEL:
            const updatedState = state.results.filter(each => each.id !== action.value);
            return{
                ...state,
                results: updatedState
            }
    }
    
    return state;
}

export default reducer;