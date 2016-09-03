import {connect} from "react-redux"
import {Link} from "react-router"
import {baseUrl} from "../api/config.js"

import QuestionItemWithAvatar from "./blocks/QuestionItemWithAvatar"
import TutorItem from "./blocks/TutorItem"

const ResultList = ({
    questions,
    tutors
}) => {
    let url = location.href.split("/")
    let query = url.pop()
    let type = url.pop()
    if(type=="question"){
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
        return(
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

export default connect(state=>({
    questions: state.hotQuestionList.data,
    tutors: state.tutorList.data
}))(ResultList)
