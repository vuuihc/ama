/**
 * Created by zhushihao on 2016/6/10.
 */
import React, { Component } from 'react'
import HotQuestionList from '../containers/HotQuestionList'
import Footer from './Footer'
export default class Index extends Component{
    render() {
        return (
            <div className="index">
                <HotQuestionList />
                <Footer />
            </div>
        )
    }
}