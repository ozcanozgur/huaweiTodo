import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const userLoginSuccess = (userData) => {
    return {
        type: actionTypes.LOGIN_USER_SUCCESS,
        userData: userData
    }
}

export const userLoginFail = (error) => {
    return {
        type: actionTypes.LOGIN_USER_FAIL
    }
}

export const userSignUpSuccess = (userData) => {
    return {
        type: actionTypes.SIGNUP_USER_SUCCESS,
        userData: userData
    }
}

export const userSignUpFail = (error) => {
    return {
        type: actionTypes.SIGNUP_USER_FAIL
    }
}

export const userLogout = () => {
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export const loginUser = (userData) => {
    return dispatch => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/users/' + userData.username,
        }).then(obj => {
            console.log(obj.data.password);
            if (obj.data.password === userData.password) {
                dispatch(userLoginSuccess(obj.data));
            }
            else
                dispatch(userLoginFail(null));
        }).catch(error => {
            dispatch(userLoginFail(error));
        });
    }
}

export const signUpUser = (userData) => {

    return dispatch => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/users',
            params: userData
        }).then(obj => {
            if (obj.status === 200) {
                dispatch(loginUser(userData));
            }
        }).catch(error => {
            dispatch(userSignUpFail(error));
        });
    }
}

