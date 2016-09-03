/**
 * Created by zhushihao on 2016/6/14.
 */
import {
    RECEIVE_TUTOR_LIST,
    RECEIVE_TUTOR_INFO,
    RECEIVE_TUTOR_ANSWER_LIST,
    REQUEST_PREPAY_INFO,
    RECEIVE_PREPAY_INFO,
    CLEAR_TUTOR_INDEX,
    REQUEST_SEARCH_TUTOR
} from '../actions/ActionTypes'

const initialState = {
    tutorList: {
        data: [],
        completed: false,
        page: 1,
        num: 10,
        searchStatus: "complete"
    },
    tutorInfo: {},
    tutorAnswerList: {
        data: [],
        completed: false,
        page: 1
    },
    prepayInfo: {
        data: {},
        loading: false
    }
}

export function tutorList(state = initialState.tutorList, action) {
    switch (action.type) {
        case RECEIVE_TUTOR_LIST:
            if (action.page == 1) {
                return Object.assign({}, initialState.tutorList, {
                    data: action.data,
                    completed: action.data.length < action.num ? true : false,
                    loading: false,
                    searchStatus:"complete"
                })
            } else {
                return Object.assign({}, state, {
                    data: state.data.concat(action.data),
                    completed: action.data.length < action.num ? true : false,
                    loading: false,
                    page: action.page,
                    searchStatus:"complete"
                })
            }
        case REQUEST_SEARCH_TUTOR:
            return Object.assign({},state,{searchStatus:"searching"})
        default:
            return state
    }
}
export function tutorInfo(state = initialState.tutorInfo, action) {
    switch (action.type) {
        case RECEIVE_TUTOR_INFO:
            return action.tutorInfo
        case CLEAR_TUTOR_INDEX:
            return initialState.tutorInfo
        default:
            return state
    }
}
export function tutorAnswerList(state = initialState.tutorAnswerList, action) {
    switch (action.type) {
        case RECEIVE_TUTOR_ANSWER_LIST:
            if (action.data.length == 0) {
                return Object.assign({}, state, {
                    completed: true,
                    loading: false
                })
            } else if (action.page == 1)
                return Object.assign({}, initialState.tutorAnswerList, {
                    data: action.data,
                    loading: false
                })
            else {

                return {
                    data: state.data.concat(action.data),
                    page: action.page,
                    loading: false
                }
            }
        case CLEAR_TUTOR_INDEX:
            return initialState.tutorAnswerList
        default:
            return state
    }
}
export function prepayInfo(state = initialState.prepayInfo, action) {
    switch (action.type) {
        case REQUEST_PREPAY_INFO:
            return Object.assign({}, state, {
                loading: true
            })
        case RECEIVE_PREPAY_INFO:
            return {
                data: action.data,
                loading: false
            }
        case CLEAR_TUTOR_INDEX:
            return initialState.prepayInfo
        default:
            return state
    }
}
