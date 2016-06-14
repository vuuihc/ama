/**
 * Created by zhushihao on 2016/6/14.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import {getQuestionInfo} from '../actions/question.js'

import '../../stylesheets/partials/modules/Question.scss'

class Question extends Component{
    componentDidMount(){
        const {id} = this.props.params
        this.props.dispatch(getQuestionInfo(id))
        console.log("questionInfo==="+this.props.questionInfo)
    }
    render() {
        const { questionInfo } = this.props
        return (
            <main className="question">
                <div className="question-content">
                    {questionInfo.question_content}
                </div>
                <div className="tutor">
                    <img src={questionInfo.avatar} />
                    <h3 >{questionInfo.name}</h3>
                    <h4 >{questionInfo.company} {questionInfo.position} </h4>
                </div>
                <div className="answer">
                    <span className="bubble">
                        <span className="bubble-tail"></span>
                        <span className="bubble-voice"></span>
                        <span className="bubble-text">1元偷偷听</span>
                    </span>
                </div>
                <div className="remark">
                    <span>{questionInfo.answer_listen}人偷听</span>
                    <span className="kui">{questionInfo.answer_dislike}人觉得亏了</span>
                </div>
                <div className="ask">
                    <div className="value">￥{questionInfo.question_prize}</div>
                    <Link className="bottom-btn" to={"ask/"+questionInfo.tutorId} >向TA提问</Link>
                </div>
            </main>
        )
    }
}

Question.propTypes = {
    questionInfo: PropTypes.arrayOf(PropTypes.shape({

    })).isRequired,
}

function mapStateToProps(state) {
    return {
        questionInfo: state.questionInfo
    }
}

export default connect(
    mapStateToProps
)(Question)