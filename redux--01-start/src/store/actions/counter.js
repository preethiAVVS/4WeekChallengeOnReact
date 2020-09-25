import * as actionTypes from "../actions/actions";

export const increment = () => {
    return {
        type: actionTypes.INC
    }
}

export const decrement = () => {
    return {
        type: actionTypes.DEC
    }
}

export const add = (value) => {
    return {
        type: actionTypes.ADD,
        value: value
    }
}

export const sub = (value) => {
    return {
        type: actionTypes.SUB,
        value: value
    }
}