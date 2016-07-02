/**
 * Created by zhushihao on 2016/6/14.
 */
import {
  RECEIVE_TUTOR_LIST,
  RECEIVE_TUTOR_INFO
}from '../actions/ActionTypes'

const initialState = {
  tutorList: [],
  tutorInfo:{}
}

export function tutorList(state = initialState.tutorList, action) {
  switch (action.type) {
    case RECEIVE_TUTOR_LIST:
      return action.tutorList
    default:
      return state
  }
}
export function tutorInfo(state = initialState.tutorInfo, action) {
  switch (action.type) {
    case RECEIVE_TUTOR_INFO:
      return action.tutorInfo
    default:
      return state
  }
}