import * as actionTypes from "../actions/actions";


export const saveResult = (value) => {
    return {
        type: actionTypes.STORE,
        value: value
    }
}

export const store = (value) => {
    return (dispatch, getState) => {
        setTimeout(()=> {
            const oldValue = getState().ctr.counter;
            console.log(oldValue);
            dispatch(saveResult(value))
        }, 2000);
    }
}

export const del = (value) => {
    return {
        type: actionTypes.DEL,
        value: value
    }
}