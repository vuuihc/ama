import React,{Component} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {baseUrl} from "../api/config.js"
import {getHotQuestionList} from "../actions/question"
import {getTutorList} from "../actions/tutor"

import QuestionItemWithAvatar from "./blocks/QuestionItemWithAvatar"
import TutorItem from "./blocks/TutorItem"

import "../../stylesheets/partials/modules/SearchResult.scss"

class SearchResult extends Component{
    constructor(props){
        super(props)
        this.state={
            status :1 // 1: 每个显示两条，2：显示问题，3：显示导师
        }

    }
    componentDidMount(){
        let search = location.href.split("/").pop()
        console.log(search)
        const {curSearch} = this.props
        if(search!==curSearch){
            this.props.getQuestionList(1,10,search)
            this.props.getTutorList(1,10,search)
        }
    }
    changeList(status){
        this.setState({status})
    }
    render(){
        const {questions,tutors,userId} = this.props
        if(this.state.status==1){
            return(
                <div className="search-results">
                    <div className="result-title">
                        <h5 className="title">内容</h5>
                        <h5 className="more" onCLick={this.changeList.bind(this,2)}>更多</h5>
                    </div>
                    <div className="question-list">
                        {questions.length>0?questions.map((question, index)=>{
                            if(index<2)
                            return <QuestionItemWithAvatar userId = {userId} question = { question } key={index}/>
                        }):<div className="empty" >暂无记录</div>}
                    </div>
                    <div className="result-title">
                        <h5  className="title">导师</h5>
                        <h5  className="more" onClick={this.changeList.bind(this,3)}>更多</h5>
                    </div>
                    <div className="tutor-list">
                        {tutors.length>0?tutors.map((item,index)=>{
                            if(index<2)
                                return <TutorItem tutor={item} />
                        }):<div className="empty" >暂无记录</div>}
                    </div>
                </div>
            )
        }else if(this.state.status==2){
            return (
                <div className="search-results">
                    <div className="result-title">
                        在问题中搜索的结果
                    </div>
                    <div className="question-list">
                        {questions.map((question, index)=>(
                            <QuestionItemWithAvatar userId = {userId} question = { question } key={index}/>
                        ))}
                    </div>
                </div>
            )
        }else{
            return (
                <div className="search-results">
                    <div className="result-title">
                        在导师中搜索的结果
                    </div>
                    <div className="tutor-list">
                        {tutors.map((tutor, index)=>(
                            <TutorItem tutor={tutor} />
                        ))}
                    </div>
                </div>
            )
        }

    }
}

export default connect(state=>({
    questions: state.hotQuestionList.data,
    tutors: state.tutorList.data,
    curSearch: state.curSearch,
    userId: state.account.userInfo.user_id
}),dispatch=>({
    getQuestionList: (page,num,search)=>{
        dispatch(getHotQuestionList(page,num,search))
    },
    getTutorList: (page,num,search) => {
        dispatch(getTutorList(page,num,search))
    }
}))(SearchResult)
