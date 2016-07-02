/**
 * Created by zsh on 2016/3/11.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getHotQuestionList} from '../actions/question.js'
import Loading from "./Loading"

import '../../stylesheets/partials/modules/HotQuestionList.scss'

class HotQuestionList extends Component {
  constructor(props){
    super(props)
    this.state={
      curAudio:"",
      curPage:1
    }
  }
  componentDidMount() {
    this.props.dispatch(getHotQuestionList(1, 10))
    function onScroll(e) {
      if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.hotQuestionList.completed) {
        const curPage = ++this.state.curPage;
        this.setState({curPage});
        this.props.dispatch(getHotQuestionList(curPage, 10))
      }
    }
    document.addEventListener('scroll', onScroll.bind(this));
  }
  wxpay(answer_audio){
    var self = this
    alert("微信支付中")
    var audio = new Audio("http://7fvhf6.com1.z0.glb.clouddn.com/7dyk%E7%BE%A4%E6%98%9F%20-%20%E6%A2%81%E7%A5%9D.mp3")
    this.setState({curAudio:audio})
    setTimeout(()=>{
      alert("支付成功,开始播放")
      self.playAudio()
    },5000)
  }
  playAudio(answer_audio){
    console.log("into playAudio");
    // var audio=new Audio("http://7fvhf6.com1.z0.glb.clouddn.com/Westlife%20-%20My%20Love.mp3");//路径
    var audio = this.state.curAudio
    // audio.src= "http://7fvhf6.com1.z0.glb.clouddn.com/7dyk%E7%BE%A4%E6%98%9F%20-%20%E6%A2%81%E7%A5%9D.mp3";
    if (window.WeixinJSBridge) {
      wx.getNetworkType({
        success: function (res) {
          audio.play();

          // audio.addEventListener("canplaythrough", function () {
          //   console.log('音频文件已经准备好，随时待命');
          //   audio.play();
          // }, false);
        },
        fail: function (res) {
          audio.play();
        }
      });
    }else{
      document.addEventListener("WeixinJSBridgeReady", function() {
        wx.getNetworkType({
          success: function (res) {
            // audio.addEventListener("canplaythrough", function () {
            //   console.log('音频文件已经准备好，随时待命');
            //   audio.play();
            // }, false);
            audio.play();

          },
          fail: function (res) {
            audio.play();
          }
        });
      }, false);
    }
  }
  render() {
    const {hotQuestionList} = this.props
    return (
      <main className="hot-question-list">
        {
          hotQuestionList.data.map((question, index) =>
            <article key={index}>
              <Link to={"question/"+question.question_id}>
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
                <span className="bubble" onClick={this.wxpay.bind(this,question.answer_audio)}>
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
        {!hotQuestionList.completed && <Loading /> }
      </main>
    )
  }
}

HotQuestionList.propTypes = {
  hotQuestionList: PropTypes.shape({}).isRequired,
}

function mapStateToProps(state) {
  return {
    hotQuestionList: state.hotQuestionList
  }
}

export default connect(
  mapStateToProps
)(HotQuestionList)
