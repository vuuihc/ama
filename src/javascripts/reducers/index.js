import { combineReducers } from 'redux'
import {hotQuestionList,questionInfo} from './question.js'
import {tutorList,} from './tutor.js'
import account from './account/index'

const rootReducer = combineReducers({
    hotQuestionList,questionInfo,
    tutorList,
    account
})

export default rootReducer
