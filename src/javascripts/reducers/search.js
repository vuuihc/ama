import {
    REQUEST_HISTORY_SEARCH,
    RECEIVE_HISTORY_SEARCH,
    RECEIVE_HOT_SEARCH,
    REQUEST_HOT_SEARCH,
    SET_CUR_SEARCH,
    DELETE_HISTORY_SUCCESS
} from '../actions/ActionTypes'

const initialState = {
    historySearch: {
        data: [],
        loading: false,
        completed:false,
        page: 1,
        num: 10,
    },
    hotSearch: {
        data: [],
        completed:false,
        loading: false,
        page: 1,
        num: 10,
    },
    curSearch: ""

}

export function historySearch(state = initialState.historySearch, action) {
    switch (action.type) {
        case REQUEST_HISTORY_SEARCH:
            return Object.assign({},state,{loading:true})
        case RECEIVE_HISTORY_SEARCH:
            if (action.page == 1) {
                return Object.assign({}, initialState.historySearch, {
                    data: action.data,
                    completed: action.data.length < action.num ? true : false,
                    loading: false,
                    page: action.page+1
                })
            } else {
                return Object.assign({}, state, {
                    data: state.data.concat(action.data),
                    completed: action.data.length < action.num ? true : false,
                    loading: false,
                    page: action.page+1
                })
            }
        case DELETE_HISTORY_SUCCESS:
            return Object.assign({},state,{data:[]})
        default:
            return state
    }
}
export function hotSearch(state = initialState.hotSearch, action) {
    switch (action.type) {
        case REQUEST_HOT_SEARCH:
            return Object.assign({},state,{loading:true})
        case RECEIVE_HOT_SEARCH:
            return Object.assign({},state,{data:action.data,loading:false,completed:true})
        default:
            return state
    }
}
export function curSearch(state = initialState.curSearch, action) {
    switch (action.type) {
        case SET_CUR_SEARCH:
            return action.curSearch
        default:
            return state
    }
}
