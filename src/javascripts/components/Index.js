/**
 * Created by zhushihao on 2016/6/10.
 */
import React, { Component } from 'react'
import QuestionList from './../containers/HotQuestionList'

export default class Index extends Component{
    render() {
        return (
            <div className="index">
                <QuestionList />
            </div>
        )
    }
}