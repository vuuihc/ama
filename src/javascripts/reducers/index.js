import { combineReducers } from 'redux'
import {hotQuestionList,questionInfo} from './question.js'
import {tutorList,tutorInfo,tutorAnswerList} from './tutor.js'
import account from './account/index'

const rootReducer = combineReducers({
    hotQuestionList,questionInfo,
    tutorList,tutorInfo,tutorAnswerList,
    account
})

export default rootReducer
