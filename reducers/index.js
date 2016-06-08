import { combineReducers } from 'redux'
import {storeCategories,storeList,storeInfo,remarkList,curPage,pageCount} from './store.js'
import {foodList, foodCategory,foodListWithCate, categoryId,searchResult} from './food.js'
import {cart,getAddedIds,getQuantity} from './cart.js'
import {orderList,orderDetail,addressList,selectedAddressId,checkoutNote,myRemarkList} from './user.js'

function getCartFromFoodList(foodListWithCate=[],id){
    for(let category of foodListWithCate){
        for(let food of category.goods){
            if(food.id==id){
                return food
            }
        }
    }
}
export function getCart(state) {
    //console.log("get into reducer getCart==state is ===="+JSON.stringify(state))
    return getAddedIds(state.cart).map(id => Object.assign(
        {},
        getCartFromFoodList(state.foodListWithCate, id),
        {
            quantity: getQuantity(state.cart, id)
        }
    ))
}

const rootReducer = combineReducers({
    storeCategories,storeList,curPage,pageCount,
    remarkList,foodList, foodCategory,foodListWithCate,
    categoryId,storeInfo,searchResult,
    cart,orderList,orderDetail,addressList,selectedAddressId,checkoutNote,myRemarkList
})

export default rootReducer
