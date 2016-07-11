/**
 * Created by zsh on 2016/7/11.
 */
import weixin from "../api/weixin"

import {
    RECEIVE_WX_CONFIG
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