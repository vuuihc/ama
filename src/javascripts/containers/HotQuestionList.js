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
    console.log("into playAudio");
    var audio=new Audio("http://7fvhf6.com1.z0.glb.clouddn.com/Westlife%20-%20My%20Love.mp3");//路径
    audio.addEventListener("canplaythrough", function () {
      console.log('音频文件已经准备好，随时待命');
    }, false);
    console.log(audio.src);
    audio.play();
  }
  render() {
    const {hotQuestionList} = this.props
    return (
      <main className="hot-question-list">
        {
          hotQuestionList.map((question, index) =>
            <article key={index}>
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
              <div className="answer" >
                <span className="bubble" onClick={this.playAudio.bind(this,question.answer_audio)}>
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
