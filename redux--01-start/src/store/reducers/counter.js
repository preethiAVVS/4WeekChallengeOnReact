import * as actionTypes from "../actions/actions";
import {updatedObject} from "../utility";
const initialState = {
    counter: 0
}

//Reducer
const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.INC:
            return updatedObject(state, {counter: state.counter + 1});
            // return {
            //     ...state,
            //     counter: state.counter + 1
            // }
        case actionTypes.DEC:
            return updatedObject(state, {counter: state.counter - 1});
            // return {
            //     ...state,
            //     counter: state.counter - 1
            // }

        case actionTypes.ADD:
            return updatedObject(state, {counter: state.counter + action.value});
            // return {
            //     ...state,
            //     counter: state.counter + action.value
            // }
        case actionTypes.SUB:
            return updatedObject(state, {counter: state.counter - action.value});
            // return {
            //      ...state,
            //     counter: state.counter - action.value
            // }
    }
    
    return state;
}

export default reducer;