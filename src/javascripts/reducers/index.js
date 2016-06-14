import { combineReducers } from 'redux'
import {hotQuestionList,questionInfo} from './question.js'
import {tutorList,} from './tutor.js'


const rootReducer = combineReducers({
    hotQuestionList,questionInfo,
    tutorList
})

export default rootReducer
