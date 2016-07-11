/**
 * Created by zsh on 2016/3/14.
 */
import {
  RECEIVE_HOT_QUESTION_LIST,
  RECEIVE_QUESTION_INFO,
  REQUEST_LISTEN_INFO,
  RECEIVE_LISTEN_INFO,
  RECEIVE_SAVE_VOICE
}from '../actions/ActionTypes'

const initialState = {
  hotQuestionList: {
    data: [],
    completed: false,
    page: 1,
    num: 10,
  },
  questionInfo: {},
  listenInfo:{
    timeStamp:0,
    data: {},
    loading:false
  },
  saveVoiceInfo:{
    data:{},
    saved:false
  }
}

export function hotQuestionList(state = initialState.hotQuestionList, action) {
  switch (action.type) {
    case RECEIVE_HOT_QUESTION_LIST:
      if (action.data.length < action.num) {
        return Object.assign({}, state, {data:action.data,completed: true})
      } else if (action.page == 1)
        return Object.assign({}, initialState.hotQuestionList, {data: action.data})
      else {
        return {data: state.data.concat(action.data), page: action.page}
      }
    default:
      return state
  }
}
export function questionInfo(state = initialState.questionInfo, action) {
  switch (action.type) {
    case RECEIVE_QUESTION_INFO:
      return action.questionInfo
    default:
      return state
  }
}
export function listenInfo(state = initialState.listenInfo, action) {
  switch (action.type) {
    case REQUEST_LISTEN_INFO:
      return Object.assign({},state,{loading:true})
    case RECEIVE_LISTEN_INFO:
      return {data: action.data,timeStamp: new Date().valueOf(),loading:false}
    default:
      return state
  }
}
export function saveVoiceInfo(state = initialState.saveVoiceInfo,action) {
  switch (action.type) {
    case RECEIVE_SAVE_VOICE:
      return {saved:true}
    default:
      return state
  }
}


