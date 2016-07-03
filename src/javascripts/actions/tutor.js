/**
 * Created by zhushihao on 2016/6/14.
 */
import tutor from '../api/tutor'

import {
  RECEIVE_TUTOR_LIST,
  RECEIVE_TUTOR_INFO,
  RECEIVE_TUTOR_ANSWER_LIST,
  RECEIVE_PREPAY_INFO
} from './ActionTypes'

export function getTutorList(page, number) {
  return dispatch => {
    tutor.getTutorList(page, number, data => {
      dispatch({
        type: RECEIVE_TUTOR_LIST,
        data,
        page
      })
    })
  }
}
export function getTutorInfo(id) {
  return dispatch => {
    tutor.getTutorInfo(id, data => {
      dispatch({
        type: RECEIVE_TUTOR_INFO,
        tutorInfo: data
      })
    })
  }
}
export function getTutorAnswerList(id,page,number) {
  return dispatch => {
    tutor.getTutorAnswerList(id,page,number, data => {
      dispatch({
        type: RECEIVE_TUTOR_ANSWER_LIST,
        data,
        page
      })
    })
  }
}
export function getPrepayInfo(content,tutorId) {
  return dispatch => {
    tutor.getPrepayInfo(content,tutorId,data => {
      dispatch({
        type: RECEIVE_PREPAY_INFO,
        data
      })
    })
  }
}