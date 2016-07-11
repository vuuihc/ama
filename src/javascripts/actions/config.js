/**
 * Created by zsh on 2016/7/11.
 */
import weixin from "../api/weixin"

import {
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