import * as actionTypes from "../actions/actions";
import {updatedObject} from "../utility";
const initialState = {
    results: []
}
const deleteHandler = (state, action) => {
        const updatedState = state.results.filter(each => each.id !== action.value);
        return updatedObject(state, { results: updatedState});
}

//Reducer
const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.STORE:
            return updatedObject(state, { results: state.results.concat({ id: new Date(), value: action.value})});
            // return{
            //     ...state,
            //     results: state.results.concat({ id: new Date(), value: action.value})
            // }
        case actionTypes.DEL:
            return deleteHandler(state, action);
            // const updatedState = state.results.filter(each => each.id !== action.value);
            // return updatedObject(state, { results: updatedState});
            // return{
            //     ...state,
            //     results: updatedState
            // }
    }
    
    return state;
}

export default reducer;