import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAtVCfCbgXTCO8QBwEYT8CkyTaEopcbCFU';
        if(!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAtVCfCbgXTCO8QBwEYT8CkyTaEopcbCFU'
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res.data);
                dispatch(authSuccess(res.data.idToken, res.data.localId))
            })
            .catch(err => {
                dispatch(authFail(err));
            })
    
    }
}