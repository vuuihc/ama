/**
 * Created by zhushihao on 2016/6/14.
 */
import tutor from '../api/tutor'

import {
    RECEIVE_TUTOR_LIST,
    RECEIVE_TUTOR_INFO,
    RECEIVE_TUTOR_ANSWER_LIST,
    REQUEST_PREPAY_INFO,
    RECEIVE_PREPAY_INFO,
    CLEAR_TUTOR_INDEX,
    SET_CUR_SEARCH,
    REQUEST_SEARCH_TUTOR
} from './ActionTypes'

export function getTutorList(page, num, search) {
    return dispatch => {
        dispatch({
            type: REQUEST_SEARCH_TUTOR
        })
        tutor.getTutorList(page, num, search, data => {
            dispatch({
                type: RECEIVE_TUTOR_LIST,
                data,
                page,
                num
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
export function getTutorAnswerList(id, page, number) {
    return dispatch => {
        tutor.getTutorAnswerList(id, page, number, data => {
            dispatch({
                type: RECEIVE_TUTOR_ANSWER_LIST,
                data,
                page
            })
        })
    }
}
export function getPrepayInfo(content, tutorId) {
    return dispatch => {
        dispatch({
            type: REQUEST_PREPAY_INFO
        })
        tutor.getPrepayInfo(content, tutorId, data => {
            dispatch({
                type: RECEIVE_PREPAY_INFO,
                data
            })
        })
    }
}
export function clearTutorIndex() {
    return {
        type: CLEAR_TUTOR_INDEX
    }
}
