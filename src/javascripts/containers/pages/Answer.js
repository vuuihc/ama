import React, {Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { Link,browserHistory } from 'react-router'
import { connect } from 'react-redux'
import '../../../stylesheets/partials/modules/Answer.scss';
import { getQuestionInfo,saveVoice } from  '../../actions/question';
import { getAskedMe } from  '../../actions/account';
import { getWXConfig } from "../../actions/config"
import time from '../../util/time'
import VoiceWave from  "../../components/VoiceWave"
import Toast from "../../util/weui/toast"
import {baseUrl} from "../../api/config"

class Answer extends Component {
  constructor(){
    super();
    this.state={
      localId: null,
      status: 0,//0:话筒等待录音，1：正在录音，2：音波等待播放，3：正在播放
      answerSuccess: false,
      successTimer:null,
      START:0,
      END:0,
      recordTimer:null
    }
    this.clickHandler = this.clickHandler.bind(this)
  }
  componentWillMount(){
    const {id} = this.props.params;
    this.props.getQuestionInfo(id);
  }
  componentDidMount(){
    this.refreshWXConfig()
    console.log(this.props.questionInfo);
    var talkBtn = ReactDOM.findDOMNode(this.refs.roundContainer)
    const self = this
    wx.ready(function(){
      talkBtn.addEventListener('click',self.clickHandler)
    })
    wx.onVoicePlayEnd({
      success: function (res) {
        self.setState({status: 2})
      }
    });
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.saveVoiceInfo.saved){
      this.setState({answerSuccess:true})
      this.props.getAskedMe(1,10)
      this.state.successTimer = setTimeout(()=>{
        this.setState({answerSuccess:false})
        browserHistory.push(baseUrl+"account/AskedMeList")
      },2000)
    }
    console.log("nextProps.WXConfig.data=="+JSON.stringify(nextProps.WXConfig.data))
    if(nextProps.WXConfig.data.timestamp){
      const now = new Date().valueOf()
      console.log("now==="+now/1000)
      console.log("timestamp==="+nextProps.WXConfig.data.timestamp)
      if(now/1000 - nextProps.WXConfig.data.timestamp<3){
        console.log("into config===");
        const jsApiList = [
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'onVoicePlayEnd',
          'uploadVoice',
          'chooseWXPay'
        ]
        const newWxConfig = {}
        console.log("newWxConfig")
        newWxConfig['debug'] = true;
        newWxConfig['appId'] = nextProps.WXConfig.data['appId'];
        newWxConfig['timestamp'] = nextProps.WXConfig.data.timestamp.toString();
        newWxConfig['nonceStr'] = nextProps.WXConfig.data['nonceStr'];
        newWxConfig['signature'] = nextProps.WXConfig.data['signature'];
        newWxConfig['jsApiList'] = jsApiList;
        console.log("newWxConfig"+JSON.stringify(newWxConfig))
        wx.config(newWxConfig)
      }
    }
  }
  componentWillUnmount(){
    const self =this
    clearTimeout(this.state.successTimer)
    var talkBtn = ReactDOM.findDOMNode(this.refs.replyContainer)
    wx.ready(function(){
      talkBtn.removeEventListener('click',self.clickHandler)
  })

  }
  refreshWXConfig(){
    const url = this.props.landPage || location.href
    console.log("now get wxconfig for url==="+url)
    this.props.getWXConfig(url)
  }
  clickHandler(event){
    // var localId,START,END,recordTimer;
    var self = this
    var recordStartHandler = function (event) {
      event.preventDefault();
      let START = new Date().getTime();
      self.setState({START:START})
      console.log("start at ==="+ START)
      wx.startRecord({
        success: function(){
          localStorage.rainAllowRecord = 'true';
        },
        cancel: function () {
          alert('用户拒绝授权录音');
        }
      });
    }
    var recordStopHandler = function (event) {
      event.preventDefault();
      let END = new Date().getTime();
      console.log("start at ==="+ self.state.START)
      console.log("stop at ==="+ END)
      if((END - self.state.START) < 300){
        END = 0;
        self.setState({START:0})
        console.log("录音时间"+(END-self.state.START));
        //小于300ms，不录音
        clearTimeout(self.state.recordTimer);
      }else{
        console.log("录音时间"+(END-self.state.START));
        wx.stopRecord({
          success: function (res) {
            let localId = res.localId
            self.setState({localId:localId})
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      }
    }
    var playStartHandler = function (event) {
      event.preventDefault()
      wx.playVoice({
        localId: self.state.localId // 需要播放的音频的本地ID，由stopRecord接口获得
      });
    }
    var playStopHandler = function (event) {
      event.preventDefault()
      wx.stopVoice({
        localId: self.state.localId // 需要停止的音频的本地ID，由stopRecord接口获得
      });
    }
    switch (self.state.status) {
      case 0:
        recordStartHandler(event)
        self.setState({status:1})
        break
      case 1:
        recordStopHandler(event)
        self.setState({status:2})
        break
      case 2:
        playStartHandler(event)
        self.setState({status:3})
        break
      case 3:
        playStopHandler(event)
        self.setState({status:2})
    }
    
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
        self.props.saveVoice(serverId,questionId)
      }
    });
    
  }
  playVoice(){
    this.setState({playing:true})
  }
  reRecord(){
    this.setState({status:0})
  }
  render() {
    const questionInfo = this.props.questionInfo;
    const classNames = {
      0 : " ",
      1 : " on",
      2 : " voice",
      3 : " voice-on"
    }
    return (
      <div className="accountAnswer">
        <Toast  show={this.state.askSuccess} >回答成功</Toast>
        <div className="question">
          <div className="head">
            <Link to={`${baseUrl}user/${questionInfo.user_id}`}><img src={questionInfo.user_face}/></Link>
            <span className="name">{questionInfo.user_name}</span>
            <span className="price">￥ {questionInfo.question_prize}</span>
          </div>
          <div className="stem">{ questionInfo.question_content}</div>
          <div className="time">{time.getTimeSpan(questionInfo.question_time)}之前</div>
        </div>
        <div className="hint">您的回答将被公开，答案每被偷听一次，你就赚 ￥0.3</div>
        <div className="replyHint">{this.state.localId==null?"点击录音":"点击试听"}</div>
        <div ref="replyContainer" className="replyContainer">
          <div ref="roundContainer" className={"round-container"+classNames[this.state.status]}>
            <div className="replyIcon"></div>
            <div className="recording"></div>
            <div className="bubble-voice"></div>
            <VoiceWave />
          </div>
        </div>
        <div className="reRecord" onClick={this.reRecord.bind(this)}>重录</div>
        <div className="recordHint">{this.state.localId==null?"点击录音按钮最多可录制60S":"点击试听可试听您最近一次的回答"}</div>
        <div className="sendBtn" onClick={this.confirmAnswer.bind(this)}>发送</div>
      </div>
    )
  }
}
Answer.contextTypes = {
  router: PropTypes.object
}
const mapStateToProps = (state) =>{
  return {
    questionInfo: state.questionInfo,
    saveVoiceInfo: state.saveVoiceInfo,
    WXConfig:state.WXConfig,
    landPage:state.landPage
  }
}

Answer = connect( mapStateToProps, { getQuestionInfo,saveVoice,getWXConfig,getAskedMe })(Answer);

export default Answer;