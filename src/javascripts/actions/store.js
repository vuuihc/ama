import fetch from 'isomorphic-fetch'
import shop from '../api/shop'
import user from '../api/user'
import {
	RECEIVE_STORE_CATEGORIES,
	RECEIVE_STORE_LIST,
	APPEND_TO_STORE_LIST,
	RECEIVE_STORE_INFO
} from './ActionTypes'

function receiveStoreCategories(storeCategories) {
  return {
	type: RECEIVE_STORE_CATEGORIES,
	storeCategories: storeCategories
  }
}

function receiveStoreList(storeList) {
  return {
	type: RECEIVE_STORE_LIST,
	storeList: storeList
  }
}

function appendToStoreList(storeList) {
	return {
		type: APPEND_TO_STORE_LIST,
		storeList
	}
}

export function getStoreCategories() {
  return dispatch => {
	shop.getStoreCategories(storeCategories => {
	  dispatch(receiveStoreCategories(storeCategories))
	})
  }
}

export function searchStore(keyword) {
  return dispatch => {
	shop.searchStore(keyword,storeList => {
	  dispatch(receiveStoreList(storeList))
	})
  }
}


export function getStoresByCatId(CatId,sort,curPage) {
  return dispatch => {
	  if(curPage){
		  shop.getStoresByCatId(CatId,sort,curPage,storeList => {
			  dispatch(appendToStoreList(storeList))
		  })
	  }else{
		  shop.getStoresByCatId(CatId,sort,1,storeList => {
			  dispatch(receiveStoreList(storeList))
		  })
	  }
  }
}

function receiveStoreInfo(storeInfo) {
	return {
		type:RECEIVE_STORE_INFO,
		storeInfo
	}
}

export function getStoreInfo(storeId) {
	return dispatch => {
		shop.getStoreInfo(storeId, storeInfo => {
			dispatch(receiveStoreInfo(storeInfo))
		})
	}
}


