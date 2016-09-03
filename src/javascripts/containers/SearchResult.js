import React,{Component} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {baseUrl} from "../api/config.js"
import {getHotQuestionList} from "../actions/question"
import {getTutorList} from "../actions/tutor"

import QuestionItemWithAvatar from "./blocks/QuestionItemWithAvatar"
import TutorItem from "./blocks/TutorItem"

import "../../stylesheets/partials/modules/SearchResult.scss"

const SearchResult = ({
    questions,
    tutors,
    curSearch,
    userId,
    questionSearchStatus,
    tutorSearchStatus,
    getQuestionList,
    getTutorList
}) => {
    let search = location.href.split("/").pop()
    search = decodeURI(search)
    if(search!==curSearch){
        getQuestionList(1,10,search)
        getTutorList(1,10,search)
    }
    return(
        <div className="search-results">
            <div className="result-title">
                <h5 className="title">内容</h5>
                {(questionSearchStatus=="complete")&&questions.length>2?<Link to={`${baseUrl}search/list/question/${search}`}><h5 className="more">更多</h5></Link>:""}
            </div>
            <div className="question-list">
                {(questionSearchStatus=="complete")&&questions.length>0?questions.map((question, index)=>{
                    if(index<2)
                    return <QuestionItemWithAvatar userId = {userId} question = { question } key={index}/>
                }):<div className="empty" >暂无相关结果</div>}
            </div>
            <div className="result-title">
                <h5  className="title">导师</h5>
                {(tutorSearchStatus=="complete")&&tutors.length>2?<Link to={`${baseUrl}search/list/tutor/${search}`}><h5  className="more">更多</h5></Link>:""}
            </div>
            <div className="tutor-list">
                {(tutorSearchStatus=="complete")&&tutors.length>0?tutors.map((item,index)=>{
                    if(index<2)
                        return <TutorItem tutor={item} />
                }):<div className="empty" >暂无相关结果</div>}
            </div>
        </div>
    )
}

export default connect(state=>({
    questions: state.hotQuestionList.data,
    tutors: state.tutorList.data,
    curSearch: state.curSearch,
    userId: state.account.userInfo.user_id,
    questionSearchStatus:state.hotQuestionList.searchStatus,
    tutorSearchStatus:state.tutorList.searchStatus
}),dispatch=>({
    getQuestionList: (page,num,search)=>{
        dispatch(getHotQuestionList(page,num,search))
    },
    getTutorList: (page,num,search) => {
        dispatch(getTutorList(page,num,search))
    }
}))(SearchResult)
