/**
 * Created by zhushihao on 2016/6/16.
 */
/**
 * create by wuwq
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/QuestionItemWithoutAvatar.scss';
import {baseUrl} from "../../api/config"

export default class QuestionItemWithoutAvatar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {question} = this.props
        return (
            <article className="question-without-avatar">
                <Link to={baseUrl+"question/"+question.question_id}>
                    <div className="question-content">
                        <h4>{ question.content }</h4>
                    </div>
                </Link>
                <div className="answer">
                <span className="bubble">
                    <span className="bubble-tail"></span>
                    <span className="bubble-voice"></span>
                    <span className="bubble-text">1元偷偷听</span>
                </span>
                </div>
                <div className="remark">
                    <div className="time">{"2"}小时前被回答</div>
                    <div className="remark-info">
                        <span>{question.listened}人偷听</span>
                        <span className="kui">{question.like}人觉得赞</span>
                    </div>
                </div>
            </article>
        )
    }
}
