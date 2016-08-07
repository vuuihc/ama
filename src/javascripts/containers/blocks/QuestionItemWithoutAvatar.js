/**
 * Created by zhushihao on 2016/6/16.
 */
/**
 * create by wuwq
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import time from '../../util/time';
import '../../../stylesheets/partials/modules/QuestionItemWithoutAvatar.scss';
import {baseUrl} from "../../api/config"

export default class QuestionItemWithoutAvatar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {question, head} = this.props
    return (
      <article className="question-without-avatar">
        <Link to={baseUrl+"question/"+question.id}>
          <div className="question-content">
            <h4>{ question.content }</h4>
          </div>
          <div className="answer">
            <img src={ head }/>

            <span className="bubble">
              <span className="bubble-tail"></span>
              <span className="bubble-voice"></span>
              <span className="bubble-text">点击播放</span>
            </span>
          </div>
          <div className="remark">
            <div className="time">{ time.getTimeSpan(question.time) }前被回答</div>
            <div className="remark-info">
              <span>{question.listen}人偷听</span>
              <span className="zan">{question.like}人觉得赞</span>
            </div>
          </div>
        </Link>
      </article>
    )
  }
}
