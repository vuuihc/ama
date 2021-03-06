/**
 * Created by zhushihao on 2016/6/13.
 */
import question from '../api/question'

import {
    RECEIVE_HOT_QUESTION_LIST,
    RECEIVE_QUESTION_INFO,
    REQUEST_LISTEN_INFO,
    RECEIVE_LISTEN_INFO,
    RECEIVE_SAVE_VOICE,
    RECEIVE_PRISE_QUESTION,
    RECEIVE_CANCEL_PRISE_QUESTION,
    RECEIVE_PAID,
    CLEAR_QUESTION,
    SET_CUR_SEARCH,
    REQUEST_SEARCH_QUESTION
} from './ActionTypes'

export function getHotQuestionList(page, num, search) {
    return dispatch => {
        dispatch({
            type: SET_CUR_SEARCH,
            curSearch: search || ""
        })
        dispatch({type:REQUEST_SEARCH_QUESTION})
        question.getHotQuestionList(page, num, search, data => {
            dispatch({
                type: RECEIVE_HOT_QUESTION_LIST,
                data,
                page,
                num
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
        dispatch({
            type: REQUEST_LISTEN_INFO
        })
        question.getListenInfo(answerId, data => {
            dispatch({
                type: RECEIVE_LISTEN_INFO,
                data
            })
        })
    }
}
export function saveVoice(serverId, questionId) {
    return dispatch => {
        question.saveVoice(serverId, questionId, data => {
            dispatch({
                type: RECEIVE_SAVE_VOICE,
                data
            })
        })
    }
}

//点赞
export function priseQuestion(answerId) {
    return dispatch => {
        question.priseQuestion(answerId, (data) => {
            dispatch({
                type: RECEIVE_PRISE_QUESTION,
                data
            })
        })
    }
}

//取消点赞
export function cancelPriseQuestion(answerId) {
    return dispatch => {
        question.cancelPriseQuestion(answerId, (data) => {
            dispatch({
                type: RECEIVE_CANCEL_PRISE_QUESTION,
                data
            })
        })
    }
}
//支付成功
export function handlePaid(index) {
    return dispatch => {
        dispatch({
            type: RECEIVE_PAID,
            index
        })
    }
}
export function clearQuesiton() {
    return {
        type: CLEAR_QUESTION
    }
}
