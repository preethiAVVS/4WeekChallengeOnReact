import * as actionTypes from "./actions";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime)
    }
}

export const auth = (email,password, isSignUp) => {
    console.log("auth");
    return dispatch => {
       dispatch(authStart());
       const authObject = {
           email: email,
           password: password,
           returnSecureToken: true
       }
       let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVj3y_-gYd487__5U4M1j8s9_Tl2M7Ebc";
       if (!isSignUp) {
           url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVj3y_-gYd487__5U4M1j8s9_Tl2M7Ebc";
       }
       axios.post(url, authObject)
       .then(response =>{
           console.log(response);
           dispatch(authSuccess(response.data.idToken, response.data.localId));
           dispatch(checkAuthTimeOut(response.data.expiresIn))
       }).catch(err => {
           dispatch(authFail(err.response.data.error));
       })
    }
}