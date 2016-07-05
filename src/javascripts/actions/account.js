import account from '../api/account'
import { 
    RECEIVE_USER_INFO,
    RECEIVE_LISTENED,
    RECEIVE_I_ASKED,
    RECEIVE_ASKED_ME,
    LISTENED_COMPLETED,
    I_ASKED_COMPLETED,
    ASKED_ME_COMPLETED,
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
export function editUserInfo(company, job, experience, introduction){
    return (dispatch) => {
        account.editUserInfo(company, job, experience, introduction, (data) => {
            dispatch({
                type: RECEIVE_USER_INFO,
                data
            })
        });
    }
}
export function getListened(page, num){
    return (dispatch) => {
        account.getListened(page, num, (data) => {
            if(data.length === 0){
                dispatch({
                    type:LISTENED_COMPLETED
                });
            }else {
                dispatch({
                    type: RECEIVE_LISTENED,
                    data
                })
            }
        })
    }
}

export function getIAsked(page, num){
    return (dispatch) => {
        account.getIAsked(page, num, (data) => {
            if(data.length === 0){
                dispatch({
                    type:I_ASKED_COMPLETED
                });
            }else {
                dispatch({
                    type: RECEIVE_I_ASKED,
                    data
                })
            }
        })
    }
}

export function getAskedMe(page, num){
    return (dispatch) => {
        account.getAskedMe(page, num, (data) => {
            if(data.length === 0){
                dispatch({
                    type:ASKED_ME_COMPLETED
                });
            }else {
                dispatch({
                    type: RECEIVE_ASKED_ME,
                    data
                })
            }
        })
    }
}
