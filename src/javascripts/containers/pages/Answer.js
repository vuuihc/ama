import React, {Component} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import '../../../stylesheets/partials/modules/Answer.scss';
import { getQuestionInfo,saveVoice } from  '../../actions/question';
import time from '../../util/time'

class Answer extends Component {
  constructor(){
    super();
    this.state={
      localId: null,
      playing: false,
      recording: false
    }
  }
  componentWillMount(){
    const {id} = this.props.params;
    this.props.getQuestionInfo(id);
  }
  componentDidMount(){
    console.log(this.props.questionInfo);
    var talkBtn = document.querySelector(".replyContainer")
    var localId,START,END,recordTimer;
    var self = this

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
            self.setState({localId:localId})
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      }
      
    }
    var clickHandler  = function (event) {
      if(self.state.recording){
        recordStopHandler(event)
        self.setState({recording:false})
      }else{
        recordStartHandler(event)
        self.setState({recording:true})
      }
    }
    talkBtn.addEventListener('click',clickHandler)

    wx.onVoicePlayEnd({
      success: function (res) {
        self.setState({playing: false})
      }
    });
  }
  componentWillReceiveProps(nextProps){
    // if(nextProps.saveVoiceInfo.data.url!=undefined){
    //   alert("保存成功，感谢您的回答")
    // }
  }
  confirmAnswer(){
    const self = this
    const localId = this.state.localId
    if(localId==null){
      alert("请先录音哦")
      return
    }
    wx.uploadVoice({
      localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        console.log("上传成功了！")
        console.log("serverId is ==="+res.serverId)
        const serverId = res.serverId
        const questionId = self.props.params.id
        self.props.dispatch(saveVoice(serverId,questionId))
      }
    });
    
  }
  playVoice(){
    wx.playVoice({
      localId: this.state.localId // 需要播放的音频的本地ID，由stopRecord接口获得
    });
    this.setState({playing:true})
  }
  reRecord(){
    this.setState({localId:null,serverId:null})
  }
  render() {
    const questionInfo = this.props.questionInfo;
    const replyContainer = <div className="replyContainer">
      <div className="replyIcon"></div>
      <div className="recording"></div>
    </div>;
    const voiceContainer =
      <div className="voiceContainer" onClick={this.playVoice.bind(this)}>
        {this.state.playing ? <VoiceWave /> : <span className="bubble-voice"></span>}
      </div>;
    return (
      <div className="accountAnswer">
        <div className="question">
          <div className="head">
            <Link to={`user/${questionInfo.user_id}`}><img src={questionInfo.user_face}/></Link>
            <span className="name">{questionInfo.user_name}</span>
            <span className="price">￥ {questionInfo.question_prize}</span>
          </div>
          <div className="stem">{ questionInfo.question_content}</div>
          <div className="time">{time.getTimeSpan(questionInfo.question_time)}之前</div>
        </div>
        <div className="hint">您的回答将被公开，答案每被偷听一次，你就赚 ￥0.3</div>
        <div className="replyHint">{this.state.localId==null?"点击录音":"点击试听"}</div>
        {this.state.localId==null?replyContainer:voiceContainer}
        <div className="reRecord" onClick={this.reRecord.bind(this)}>重录</div>
        <div className="recordHint">{this.state.localId==null?"点击录音按钮最多可录制120S":"点击试听可试听您最近一次的回答"}</div>
        <div className="sendBtn" onClick={this.confirmAnswer.bind(this)}>发送</div>
      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return {
    questionInfo: state.questionInfo,
    saveVoiceInfo: state.saveVoiceInfo
  }
}

Answer = connect( mapStateToProps, { getQuestionInfo })(Answer);

export default Answer;