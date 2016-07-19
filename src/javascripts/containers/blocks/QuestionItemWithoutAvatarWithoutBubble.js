/**
 * Created by zhushihao on 2016/6/16.
 */
/**
 * create by wuwq
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import {baseUrl} from "../../api/config"
import '../../../stylesheets/partials/modules/QuestionItemWithoutAvatarWithoutBubble.scss';

class QuestionItemWithoutAvatarWithoutBubble extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {question} = this.props;
    return (
      <Link to={baseUrl+"question/"+question.id}>
        <article className="question-without-avatar-without-bubble">
          <div className="question-content">
            <h4>{question.content}</h4>
          </div>
          <div className="status">
              {
                  question.isanswered == '0'
                ? <div className="btn not-solved">待解决</div>
                : <div className="btn solved">已解决</div>
              }
          </div>
        </article>
      </Link>
    )
  }
}

export default QuestionItemWithoutAvatarWithoutBubble;
