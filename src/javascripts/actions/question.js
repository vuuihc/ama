/**
 * Created by zhushihao on 2016/6/13.
 */
import question from '../api/question'

import {
    RECEIVE_HOT_QUESTION_LIST,
} from './ActionTypes'

export function getHotQuestionList(page,number) {
    return dispatch => {
        question.getHotQuestionList(page,number,data => {
            dispatch({
                type: RECEIVE_HOT_QUESTION_LIST,
                hotQuestionList: data
            })
        })
    }
}