/**
 * Created by zsh on 2016/3/11.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import {getHotQuestionList} from '../actions/question.js'

import '../../stylesheets/partials/modules/HotQuestionList.scss'

class HotQuestionList extends Component{
    componentDidMount(){
        this.props.dispatch(getHotQuestionList(1,10))
        console.log("hotQuestionList==="+this.props.hotQuestionList)
    }
    render() {
        const { hotQuestionList } = this.props
        return (
            <main className="hot-question-list">
                {
                    hotQuestionList.map((question,index) =>
                    <article>
                        <Link to={"question/"+question.id} >
                            <div className="question-content">
                                <h4>{question.question_content}</h4>
                            </div>
                        </Link>
                        <div className="mentor">
                            <img src={question.user_face} />
                            <div className="mentor-info">
                                <span className="name">{question.user_name}</span>
                                <span>{question.user_title}</span>
                            </div>
                        </div>
                        <div className="answer">
                            <span className="bubble">
                                <span className="bubble-tail"></span>
                                <span className="bubble-voice"></span>
                                <span className="bubble-text">1元偷偷听</span>
                            </span>
                        </div>
                        <div className="remark">
                            <div className="value">价值￥{question.question_prize}</div>
                            <div className="remark-info">
                                <span>{question.answer_listen}人偷听</span>
                                <span className="kui">{question.answer_dislike}人觉得亏了</span>
                            </div>
                        </div>
                    </article>
                    )
                }
            </main>
        )
    }
}

HotQuestionList.propTypes = {
    hotQuestionList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
}

function mapStateToProps(state) {
    return {
        hotQuestionList: state.hotQuestionList
    }
}

export default connect(
    mapStateToProps
)(HotQuestionList)
