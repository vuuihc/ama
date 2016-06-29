import userInfo from './userInfo'
import listened from './listened' 
import iAsked from './iAsked'
import askedMe from './askedMe'
import { combineReducers } from 'redux'

const index = combineReducers({
    userInfo,
    listened,
    iAsked,
    askedMe
})

export default index;