import { combineReducers } from 'redux'
import {hotQuestionList,} from './question.js'
import {tutorList,} from './tutor.js'


const rootReducer = combineReducers({
    hotQuestionList,
    tutorList
})

export default rootReducer
