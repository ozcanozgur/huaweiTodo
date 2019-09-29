import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const userLoginSuccess = (userData) => {
    return {
        type : actionTypes.LOGIN_USER_SUCCESS,
        userData : userData
    }
}

export const userLoginFail = (id) => {
    return {
        type : actionTypes.LOGIN_USER_FAIL
    }
}

export const userSignUpSuccess = (id) => {
    return {
        type : actionTypes.SIGNUP_USER_SUCCESS
    }
}

export const userSignUpFail = (id) => {
    return {
        type : actionTypes.SIGNUP_USER_FAIL
    }
}

export const userLogout = () => {
    return {
        type : actionTypes.USER_LOGOUT
    }
}

export const loginUser = (userData) => {
    return dispatch => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/users/' + userData.username,
        }).then(obj => {
           
            console.log(obj.data);
            if(obj.data){
                dispatch(userLoginSuccess(obj.data));
                console.log("giriş başarılı");
            }
        })
        // axios.post('/api/users', userData)
        //     .then(
        //         response => {
        //             //console.log(response.data);
        //             //dispatch(userSignUpSuccess(response.data.name, userData));
        //             // this.props.history.push('/');
        //             console.log("okey");
        //         }
        //     )
        //     .catch(error => {
        //         //console.log(error);
        //         //dispatch(purchaseBurgerFail(error));
        //     });
    }
}

export const signUpUser = (userData) => {
    return dispatch => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/users',
            params: userData
        }).then(obj => {
            console.log("signup");
            console.log(obj.data);
            console.log(obj);
        }).catch(error => {
            console.log(error);
            //dispatch(purchaseBurgerFail(error));
        });
    }
}

