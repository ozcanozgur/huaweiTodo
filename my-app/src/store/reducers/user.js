import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: null,
    isAuth: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.userData,
                isAuth: true
            };
        case actionTypes.LOGIN_USER_FAIL:
            return {
                ...state,
                user: null,
                isAuth: false
            };
        case actionTypes.SIGNUP_USER_SUCCESS:
            const newUser = {
                ...action.userData,
                id: action.userId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                users: state.users.concat(newUser)
            };
        case actionTypes.SIGNUP_USER_FAIL:
            return {
                ...state,
                user: true
            }
        case actionTypes.USER_LOGOUT:
            console.log("USER_LOGOUT");
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