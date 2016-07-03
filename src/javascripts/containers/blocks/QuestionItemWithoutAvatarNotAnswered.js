/**
 * Created by zhushihao on 2016/6/16.
 */
/**
 * create by wuwq
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/QuestionItemWithoutAvatarNotAnswered.scss';

export default class QuestionItemWithoutAvatar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {question} = this.props;
    return (
      <article className="question-without-avatar-not-answered">
        <div className="question-content">
          <h4>{question.content}</h4>
        </div>
        <div className="status"><div className="btn">待解决</div></div>
      </article>
    )
  }
}
