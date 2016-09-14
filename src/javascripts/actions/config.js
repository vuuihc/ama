/**
 * Created by zsh on 2016/7/11.
 */
import weixin from "../api/weixin"

import {
    WX_CONFIG_SUCCESS,
    RECEIVE_WX_CONFIG,
    SET_LAND_PAGE
} from "./ActionTypes"

export function getWXConfig(url) {
    return dispatch => {
        weixin.getWXConfig(url, data => {
            dispatch({
                type: RECEIVE_WX_CONFIG,
                data
            })
        })
    }
}
export function setLandPage(landPage) {
    return dispatch => {
        dispatch({
            type: SET_LAND_PAGE,
            landPage
        })
    }
}
export function configSuccess(){
    return dispatch => {
        dispatch({
            type: WX_CONFIG_SUCCESS
        })
    }
}
