/**
 * Created by zhushihao on 2016/6/13.
 */
import question from '../api/question'

import {
  RECEIVE_HOT_QUESTION_LIST,
  RECEIVE_QUESTION_INFO,
  RECEIVE_LISTEN_INFO,
  RECEIVE_SAVE_VOICE
} from './ActionTypes'

export function getHotQuestionList(page, number) {
  return dispatch => {
    question.getHotQuestionList(page, number, data => {
      dispatch({
        type: RECEIVE_HOT_QUESTION_LIST,
        data,
        page
      })
    })
  }
}
export function getQuestionInfo(id) {
  return dispatch => {
    question.getQuestionInfo(id, data => {
      dispatch({
        type: RECEIVE_QUESTION_INFO,
        questionInfo: data
      })
    })
  }
}
export function getListenInfo(answerId) {
  return dispatch => {
    question.getListenInfo(answerId, data => {
      dispatch({
        type: RECEIVE_LISTEN_INFO,
        data
      })
    })
  }
}
export function saveVoice(serverId,questionId) {
  return dispatch => {
    question.saveVoice(serverId, questionId, data => {
      dispatch({
        type: RECEIVE_SAVE_VOICE,
        data
      })
    })
  }
}
