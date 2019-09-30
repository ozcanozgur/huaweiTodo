import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: null,
    isAuth: false
}

const reducer = (state = initialState, action, useAlert) => {
    
    switch (action.type) {
        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.userData,
                isAuth: true
            };
        case actionTypes.LOGIN_USER_FAIL:
                alert('Girdiğiniz Bilgiler Hatalı!!');
                console.log("LOGIN_USER_FAIL");
            return {
                ...state,
                user: null,
                isAuth: false
            };
        case actionTypes.SIGNUP_USER_SUCCESS:
            return {
                ...state,
                user: action.userData,
                isAuth : true
            };
        case actionTypes.SIGNUP_USER_FAIL:
                alert('Kullanıcı Mevcut');
            return {
                ...state,
            }
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                user: null,
                isAuth : false
            }
        default:
            return state;
    }
}

export default reducer;