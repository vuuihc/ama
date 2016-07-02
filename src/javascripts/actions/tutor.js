/**
 * Created by zhushihao on 2016/6/14.
 */
import tutor from '../api/tutor'

import {
  RECEIVE_TUTOR_LIST,
  RECEIVE_TUTOR_INFO
} from './ActionTypes'

export function getTutorList(page, number) {
  return dispatch => {
    tutor.getTutorList(page, number, data => {
      dispatch({
        type: RECEIVE_TUTOR_LIST,
        tutorList: data
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