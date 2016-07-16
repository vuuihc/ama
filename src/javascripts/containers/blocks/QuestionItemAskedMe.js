/**
 * Created by zhushihao on 2016/6/16.
 */
/**
 * create by wuwq
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/QuetionItemAskedMe.scss';

class QuestionItemAskedMe extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {question} = this.props;
    return (
      <article className="quetion-item-asked-me">
        <div className="userInfo">
          <img src={question.user_face} />
          <span>{question.user_name}</span>
        </div>
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
    )
  }
}

// const mapStateToProps = (state) => {
//     return {
//         is_teacher: state.account.userInfo.is_teacher
//     }
// }
// QuestionItemWithoutAvatarWithoutBubble = connect(mapStateToProps)();
export default QuetionItemAskedMe;
