/**
 * Created by zhushihao on 2016/6/16.
 */
/**
 * create by wuwq
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import { baseUrl } from '../../api/config';
import '../../../stylesheets/partials/modules/QuestionItemAskedMe.scss';

class QuestionItemAskedMe extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {question} = this.props;
    return (
      <article className="question-item-asked-me">
        <div className="userInfo">
          <Link to = {`${baseUrl}user/${question.question_user_id}`} >
            <img src={question.user_face.slice(0, -1) + '64'} />
            <span>{question.user_name}</span>
          </Link>
        </div>
        <Link to = {`${baseUrl}answer/${question.id}`}>
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
        </Link>
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
export default QuestionItemAskedMe;
