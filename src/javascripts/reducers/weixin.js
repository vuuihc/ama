/**
 * Created by zsh on 2016/7/11.
 */
import {
    WX_CONFIG_SUCCESS,
    RECEIVE_WX_CONFIG,
    SET_LAND_PAGE
} from '../actions/ActionTypes'

const initialState = {
    WXConfig: {
        success: false,
        data: {},
    },
    landPage: null,
}

export function WXConfig(state = initialState.WXConfig, action) {
    switch (action.type) {
        case RECEIVE_WX_CONFIG:
            return Object.assign({}, state, {
                data: action.data
            })
        case WX_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                success: true
            })
        default:
            return state
    }
}
export function landPage(state = initialState.landPage, action) {
    switch (action.type) {
        case SET_LAND_PAGE:
            return action.landPage
        default:
            return state
    }
}
