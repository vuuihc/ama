/**
 * Created by zhushihao on 2016/9/3.
 */
import search from '../api/search'

import {
    REQUEST_HOT_SEARCH,
    RECEIVE_HOT_SEARCH,
    REQUEST_HISTORY_SEARCH,
    RECEIVE_HISTORY_SEARCH,
    DELETE_HISTORY_SUCCESS
} from './ActionTypes'

export function getHotSearch() {
    return dispatch => {
        dispatch({
            type: REQUEST_HOT_SEARCH
        })
        search.getHotSearch(data => {
            dispatch({
                type: RECEIVE_HOT_SEARCH,
                data
            })
        })
    }
}
export function getHistorySearch(page, num) {
    return dispatch => {
        dispatch({
            type: REQUEST_HISTORY_SEARCH
        })
        search.getHistorySearch(page, num, data => {
            dispatch({
                type: RECEIVE_HISTORY_SEARCH,
                data:data.result,
                // data: ["测试","测试"],
                page,
                num
            })
        })
    }
}
export function deleteHistory(){
    return dispatch => {
        search.deleteHistory(data => {
            dispatch({
                type: DELETE_HISTORY_SUCCESS
            })
        })
    }
}
