/**
 * Created by zsh on 2016/7/11.
 */
import {
  RECEIVE_WX_CONFIG,
}from '../actions/ActionTypes'

const initialState = {
  WXConfig: {
    data:{},
  }
}

export function WXConfig(state = initialState.WXConfig, action) {
  switch (action.type) {
    case RECEIVE_WX_CONFIG:
      return Object.assign({},state,{data:action.data})
    default:
      return state
  }
}