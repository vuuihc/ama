import { combineReducers } from 'redux'
import {hotQuestionList,} from './question.js'


const rootReducer = combineReducers({
    storeCategories,storeList,curPage,pageCount,
    remarkList,foodList, foodCategory,foodListWithCate,
    categoryId,storeInfo,searchResult,
    cart,orderList,orderDetail,addressList,selectedAddressId,checkoutNote,myRemarkList
})

export default rootReducer
