import account from '../api/account'
import { RECEIVE_USER_INFO } from './ActionTypes'

export function getUserInfo() {
    return (dispatch) => {
        account.getUserInfo((data) => {
            dispatch({
                type: RECEIVE_USER_INFO,
                data
            })
        })
    }
}