/**
 * Created by zsh on 2016/3/11.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getHotQuestionList} from '../actions/question.js'

import '../../stylesheets/partials/modules/HotQuestionList.scss'

class HotQuestionList extends Component {
  componentDidMount() {
    this.props.dispatch(getHotQuestionList(1, 10))
    console.log("hotQuestionList===" + this.props.hotQuestionList)
  }
  playAudio(answer_audio){
    audio=new Audio(answer_audio);//路径
    audio.src = answer_audio;
    audio.addEventListener("canplaythrough", function () {
      audio.play();
      console.log('音频文件已经准备好，随时待命');
    }, false);
  }
  render() {
    const {hotQuestionList} = this.props
    return (
      <main className="hot-question-list">
        {
          hotQuestionList.map((question, index) =>
            <article>
              <Link to={"question/"+question.id}>
                <div className="question-content">
                  <h4>{question.question_content}</h4>
                </div>
              </Link>
              <Link to={"tutor/"+question.teacher_id}>
                <div className="mentor">
                  <img src={question.teacher_face}/>
                  <div className="mentor-info">
                    <span className="name">{question.teacher_name}</span>
                    <span>{question.user_title}</span>
                  </div>
                </div>
              </Link>
              <div className="answer" onCLick={this.playAudio.bind(this,question.answer_audio)}>
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
  hotQuestionList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

function mapStateToProps(state) {
  return {
    hotQuestionList: state.hotQuestionList
  }
}

export default connect(
  mapStateToProps
)(HotQuestionList)
