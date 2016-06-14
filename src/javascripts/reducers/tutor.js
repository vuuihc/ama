/**
 * Created by zhushihao on 2016/6/14.
 */
import {
    RECEIVE_TUTOR_LIST,
}from '../actions/ActionTypes'

const initialState = {
    tutorList:[]
}

export function tutorList(state = initialState.tutorList, action){
    switch (action.type) {
        case RECEIVE_TUTOR_LIST:
            return action.tutorList
        default:
            return state
    }
}