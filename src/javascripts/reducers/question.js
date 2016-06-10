/**
 * Created by zsh on 2016/3/14.
 */
import {
    RECEIVE_HOT_QUESTION_LIST,
    }from '../actions/ActionTypes'

const initialState = {
    hotQuestionList:[]
}

export function hotQuestionList(state = initialState.hotQuestionList, action){
    switch (action.type) {
        case RECEIVE_HOT_QUESTION_LIST:
            return action.hotQuestionList
        default:
            return state
    }
}

