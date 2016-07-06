import { combineReducers } from 'redux'
import {hotQuestionList,questionInfo,listenInfo,saveVoiceInfo} from './question.js'
import {tutorList,tutorInfo,tutorAnswerList,prepayInfo} from './tutor.js'
import account from './account/index'

const rootReducer = combineReducers({
    hotQuestionList,questionInfo,listenInfo,saveVoiceInfo,
    tutorList,tutorInfo,tutorAnswerList,prepayInfo,
    account
})

export default rootReducer
