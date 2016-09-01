import {
  RECEIVE_HISTORY_SEARCH,
  RECEIVE_HOT_SEARCH,
}from '../actions/ActionTypes'

const initialState = {
  historySearch: {
    data: [
        "郭富城",
        "郭富城",
        "郭富城",
        "郭富城"
    ],
    completed: false,
    page: 1,
    num: 10,
  },
  hotSearch: {
    data: [
        "刘德华",
        "刘德华",
        "刘德华",
        "刘德华",
        "刘德华",
        "刘德华"
    ],
    completed: false,
    page: 1,
    num: 10,
  },

}

export function historySearch(state = initialState.historySearch, action) {
  switch (action.type) {
    case RECEIVE_HISTORY_SEARCH:
      if(action.page==1){
        return Object.assign({},initialState.historySearch,{
          data:action.data,
          completed:action.data.length < action.num ? true : false,
          loading:false
        })
      }else{
        return Object.assign({},state,{
          data:state.data.concat(action.data),
          completed:action.data.length < action.num ? true : false,
          loading:false,
          page:action.page
        })
      }
    default:
      return state
  }
}
export function hotSearch(state = initialState.hotSearch, action) {
  switch (action.type) {
    case RECEIVE_HOT_SEARCH:
      return action.hotSearch
    default:
      return state
  }
}
