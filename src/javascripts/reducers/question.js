/**
 * Created by zsh on 2016/3/14.
 */
import {
    RECEIVE_HOT_QUESTION_LIST,
    RECEIVE_QUESTION_INFO
    }from '../actions/ActionTypes'

const initialState = {
    hotQuestionList:[],
    questionInfo:{}
}

export function hotQuestionList(state = initialState.hotQuestionList, action){
    switch (action.type) {
        case RECEIVE_HOT_QUESTION_LIST:
            return action.hotQuestionList
        default:
            return state
    }
}
export function questionInfo(state = initialState.questionInfo, action){
    switch (action.type) {
        case RECEIVE_QUESTION_INFO:
            return action.questionInfo
        default:
            return state
    }
}


