import React, {Component} from 'react'
import { connect } from 'react-redux'
import '../../../stylesheets/partials/modules/Answer.scss';
import { getQuestionInfo } from  '../../actions/question';
import time from '../../util/time'

class Answer extends Component {
  constructor(){
    super();
    this.state={
      localId: ''
    }
  }
  componentWillMount(){
    const {id} = this.props.params;
    this.props.getQuestionInfo(id);
  }
  componentDidMount(){
    var talkBtn = document.querySelector(".replyContainer")
    var localId,START,END,recordTimer;
    function uploadVoice(){
      //调用微信的上传录音接口把本地录音先上传到微信的服务器
      //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
      wx.uploadVoice({
        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          console.log("上传成功了！")
          console.log("serverId is ==="+res.serverId)
          wx.playVoice({
            localId:localId
          })
          //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
          // $.ajax({
          //   url: '后端处理上传录音的接口',
          //   type: 'post',
          //   data: JSON.stringify(res),
          //   dataType: "json",
          //   success: function (data) {
          //     alert('文件已经保存到七牛的服务器');//这回，我使用七牛存储
          //   },
          //   error: function (xhr, errorType, error) {
          //     console.log(error);
          //   }
          // });
        }
      });
    }

    var recordStartHandler = function (event) {
      event.preventDefault();
      START = new Date().getTime();
      talkBtn.classList.add('on')
      recordTimer = setTimeout(function(){
        wx.startRecord({
          success: function(){
            localStorage.rainAllowRecord = 'true';
          },
          cancel: function () {
            alert('用户拒绝授权录音');
          }
        });
      },300);
    }
    var recordStopHandler = function (event) {
      event.preventDefault();
      END = new Date().getTime();
      talkBtn.classList.remove('on');
      if((END - START) < 300){
        END = 0;
        START = 0;
        console.log("录音时间"+(END-START));
        //小于300ms，不录音
        clearTimeout(recordTimer);
      }else{
        console.log("录音时间"+(END-START));
        wx.stopRecord({
          success: function (res) {
            localId = res.localId
            console.log("停止录音成功，开始上传")
            uploadVoice();
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      }
      
    }
    var touchMoveHandler = function (event) {
      event.preventDefault();
    }
    talkBtn.addEventListener('touchstart',recordStartHandler)
    talkBtn.addEventListener('mouseup',recordStopHandler)
    talkBtn.addEventListener('touchmove',touchMoveHandler)
  }
  render() {
    const questionInfo = this.props.questionInfo ;
    return (
      <div className="accountAnswer">
        <div className="question">
          <div className="head">
            <img src={require('../../../images/head.jpg')}/>
            <span className="name">{questionInfo.user_name}</span>
            <span className="price">￥ {questionInfo.question_prize}</span>
          </div>
          <div className="stem">{ questionInfo.question_content}</div>
          <div className="time">{time.getTimeSpan(questionInfo.asked_time)}之前</div>
        </div>
        <div className="hint">您的回答将被公开，答案每被偷听一次，你就赚 ￥0.3</div>
        <div className="replyHint">语音回复</div>
        <div className="replyContainer">
          <div className="replyIcon"></div>
          <div className="recording"></div>
        </div>
        <div className="reRecord">重录</div>
        <div className="recordHint">点击开始录制最多可录制120S</div>
        <div className="sendBtn">发送</div>
      </div>
    )
  }

}
const mapStateToProps = (state) =>{
  return {
    questionInfo: state.questionInfo
  }
}

Answer = connect( mapStateToProps, { getQuestionInfo })(Answer);

export default Answer;