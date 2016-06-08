/**
 * Created by zsh on 2016/3/14.
 */
import {
    RECEIVE_FOOD_LIST,
    RECEIVE_FOOD_CATEGORY,
    RECEIVE_FOOD_LIST_WITH_CATE,
    SET_FOOD_CATEGORY,
    RECEIVE_SEARCH_RESULT
    }from '../actions/ActionTypes'
//const initialState = {
//    foodList
//}
export function foodList(state =[],action){
    switch (action.type) {
        case RECEIVE_FOOD_LIST:
            return action.foodList
        default:
            return state
    }
}

export function foodCategory(state=[],action){
    switch (action.type) {
        case RECEIVE_FOOD_CATEGORY:
            return action.foodCategory
        default:
            return state
    }
}

export function foodListWithCate(state=[],action){
    switch (action.type) {
        case RECEIVE_FOOD_LIST_WITH_CATE:
            return action.foodListWithCate
        default:
            return state
    }
}
export function categoryId(state = 'ALL',action) {
    switch (action.type) {
        case SET_FOOD_CATEGORY:
            return action.categoryId
        default:
            return state
    }
}

export function searchResult(state = {},action) {
    switch (action.type) {
        case RECEIVE_SEARCH_RESULT:
            return action.searchResult
        default:
            return state
    }
}
