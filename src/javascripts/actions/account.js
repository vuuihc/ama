import account from '../api/account'
import { 
    RECEIVE_USER_INFO,
    RECEIVE_LISTENED,
    RECEIVE_I_ASKED,
    RECEIVE_ASKED_ME
} from './ActionTypes'


export function  getUserInfo() {
    return (dispatch) => {
        account.getUserInfo((data) => {
            dispatch({
                type: RECEIVE_USER_INFO,
                data
            })
        })
    }
}

export function getListened(){
    return (dispatch) => {
        account.getListened((data) => {
            dispatch({
                type: RECEIVE_LISTENED,
                data
            })
        })
    }
}

export function getIAsked(){
    return (dispatch) => {
        account.getIAsked((data) => {
            dispatch({
                type: RECEIVE_I_ASKED,
                data
            })
        })
    }
}

export function getAskedMe(){
    return (dispatch) => {
        account.getAskedMe((data) => {
            dispatch({
                type: RECEIVE_ASKED_ME,
                data
            })
        })
    }
}