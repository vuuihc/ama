import React, {Component} from 'react'
import { Link } from 'react-router'
import {baseUrl} from "../../api/config"

class QuestionItemWithAvatar extends Component{
    constructor(){
        super();
    }
    getPrepayInfo(questionId,answerId){
        this.setState({curQuestionId:questionId,curAnswerId:answerId})
        this.props.dispatch(getListenInfo(answerId))
    }
    bubbleClick(answerId,questionId,isPayed){
        if(isPayed){
            browserHistory.push(`${baseUrl}question/${questionId}`)
        }else{
            this.getPrepayInfo(questionId,answerId)
        }
    }
    render() {
        const { question } = this.props;
        return(
            <article>
                <Link to={baseUrl +"question/"+question.question_id}>
                    <div className="question-content">
                        <h4>{question.question_content}</h4>
                    </div>
                </Link>
                <Link to={baseUrl+"tutor/"+question.teacher_id}>
                    <div className="mentor">
                        <img src={question.teacher_face}/>
                        <div className="mentor-info">
                            <span className="name">{question.teacher_name}</span>
                            <span>{question.user_title}</span>
                        </div>
                    </div>
                </Link>
                <div className="answer" >
                <span className="bubble" onClick={this.bubbleClick.bind(this,question.answer_id,question.question_id,question.answer_ispayed)}>
                  <span className="bubble-tail"></span>
                  <span className="bubble-voice"></span>
                  <span className="bubble-text">{question.answer_ispayed?"点击偷偷听":"1元偷偷听"}</span>
                </span>
                </div>
                <div className="remark">
                    <div className="value">价值￥{question.question_prize}</div>
                    <div className="remark-info">
                        <span>{question.answer_listen}人偷听</span>
                        <span className="kui">{question.answer_like}人觉得赞</span>
                    </div>
                </div>
            </article>
        )
    }
}
export default QuestionItemWithAvatar;