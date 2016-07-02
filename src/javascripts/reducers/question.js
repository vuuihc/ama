/**
 * Created by zsh on 2016/3/14.
 */
import {
  RECEIVE_HOT_QUESTION_LIST,
  RECEIVE_QUESTION_INFO
}from '../actions/ActionTypes'

const initialState = {
  hotQuestionList: {
    data: [],
    completed: false,
    page: 1
  },
  questionInfo: {}
}

export function hotQuestionList(state = initialState.hotQuestionList, action) {
  switch (action.type) {
    case RECEIVE_HOT_QUESTION_LIST:
      if (action.data.length == 0) {
        return Object.assign({}, state, {completed: true})
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


