import React, {Component,PropTypes} from 'react'
import ReactDOM from 'react-dom'
import { Link,browserHistory, withRouter } from 'react-router'
import { connect } from 'react-redux'
import '../../../stylesheets/partials/modules/Answer.scss';
import { getQuestionInfo,saveVoice } from  '../../actions/question';
import { getAskedMe } from  '../../actions/account';
import { getWXConfig } from "../../actions/config"
import time from '../../util/time'
import VoiceWave from  "../../components/VoiceWave"
import Toast from "../../util/weui/toast"
import {baseUrl,domain} from "../../api/config"
import Confirm from "../../util/weui/confirm"
import Alert from "../../util/weui/alert"

class Answer extends Component {
  constructor(){
    super();
    this.state={
      localId: null,
      status: 0,//0:话筒等待录音，1：等待微信发起录音，2：录音中，3：等待微信停止录音，4：等待播放，5：播放中
      answerSuccess: false,
      successTimer:null,
      START:0,
      END:0,
      showAlert:false,
      alertContent:"",
      alert:{
        title:"提示",
        buttons:[
          {
            type:"default",
            label:"确定",
            onClick:this.hideAlert.bind(this)
          }
        ]
      },
      showConfirm:false,
      confirmText:"",
      confirm:{
        title:"提示",
        buttons:[
          {
            type:"primary",
            label:"接着回答",
            onClick:this.hideAlert.bind(this)
          },
          {
            type:"default",
            label:"离开",
            onClick:this.leaveThisPage.bind(this)
          }
        ]
      },
      nextLocation:location.href
    }
    this.clickHandler = this.clickHandler.bind(this)
	  this.routerWillLeave = this.routerWillLeave.bind(this)
  }
  hideAlert(){
    this.setState({showAlert:false})
  }
  leaveThisPage(){
    browserHistory.push(this.state.nextLocation.pathname)
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
      console.log("allowRecord"+sessionStorage.allowRecord)
      if(!sessionStorage.allowRecord || sessionStorage.allowRecord !== 'true'){
        wx.startRecord({
          success: function(){
            sessionStorage.allowRecord = true;
            self.recordTimer = setTimeout(function(){
              wx.stopRecord();
            },500);
            console.log("here");
          },
          cancel: function () {
            // alert('用户拒绝授权录音');
            self.setState({alertContent:"用户拒绝授权录音",showAlert:true})
          }
        });
      }
      talkBtn.addEventListener('click',self.clickHandler,false)
    })
    wx.onVoicePlayEnd({
      success: function (res) {
        self.setState({status: 4})
      }
    });
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
  }
  routerWillLeave(nextLocation) {
    // return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    if(!this.state.answerSuccess){
      // return '您的回答尚未完成，确认离开?'
      this.setState({confirmText:"您的回答尚未完成，确认离开?",showConfirm:true,nextLocation:nextLocation})
    }
  }
  componentWillReceiveProps(nextProps){
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
        newWxConfig['debug'] = false;
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
    var talkBtn = ReactDOM.findDOMNode(this.refs.roundContainer)
    wx.ready(function(){
      talkBtn.removeEventListener('click',self.clickHandler,false)
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
      wx.startRecord({
        success:function () {
          let START = new Date().getTime();
          self.setState({START:START,status:2})
          console.log("start at ==="+ START)
        },
        cancel: function () {
          // alert('用户拒绝授权录音');
          self.setState({status:0,alertContent:"用户拒绝授权录音",showAlert:true})
        }
      });
    }
    var recordStopHandler = function (event) {
      // event.preventDefault();
      let END = new Date().getTime();
      console.log("录音时间"+(END-self.state.START));
      if((END - self.state.START) < 1000){
        END = 0;
        // alert("录音不能小于1秒哦")
        wx.stopRecord()
        self.setState({status:0,alertContent:"录音不能少于1秒哦",showAlert:true})
        return null
      }else{
        console.log("录音时间"+(END-self.state.START));
        wx.stopRecord({
          success: function (res) {
            let localId = res.localId
            self.setState({localId:localId,status:4})
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
    var passHandler = function (event) {
      console.log("wait for wx")
    }
    switch (self.state.status) {
      case 0:/*话筒等待录音*/
        self.setState({status: 1})
        recordStartHandler(event)
        break
      case 1:/*等待微信发起录音*/
        passHandler(event)
        break
      case 2:/*录音中*/
        self.setState({status:3})
        recordStopHandler(event)
        break
      case 3:/*等待微信停止录音*/
        passHandler(event)
        break
      case 4:/*等待播放*/
        self.setState({status:5})
        playStartHandler(event)
        break
      case 5:/*播放中*/
        playStopHandler(event)
        self.setState({status:4})
    }
    
  }
  saveVoice(serverId,questionId){
    const self = this
    fetch( `${domain}/api/v1/answer/answer`,{
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        server_id:serverId,
        question_id:questionId
      })
    })
      .then(res => res.json())
      .then(json => {
        if(json.errCode==0){
          self.setState({answerSuccess:true})
          self.props.getAskedMe(1,10)
          let successTimer = setTimeout(()=>{
            browserHistory.push(baseUrl+"account/AskedMeList")
          },2000)
          self.setState({successTimer:successTimer})
        }else{
          // alert("抱歉，上传失败")
          self.setState({alertContent:"抱歉，录音上传失败",showAlert:true})
          console.log("语音上传失败，原因是"+json.msg)
        }
      });
  }
  confirmAnswer(){
    const self = this
    const localId = this.state.localId
    if(localId==null){
      // alert("请先录音哦")
      self.setState({alertContent:"请先录音哦",showAlert:true})
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
        self.saveVoice(serverId,questionId)
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
      1 : " ",
      2 : " on",
      3 : " on",
      4 : " voice",
      5 : " voice-on"
    }
    const Tips = {
      0 : <div>点击录音</div>,
      1 : <div>开启中</div>,
      2 : <div>正在录音<br/>点击停止</div>,
      3 : <div>停止中</div>,
      4 : <div>点击试听</div>,
      5 : <div>播放中</div>
    }
    return (
      <div className="accountAnswer">
        <Toast  show={this.state.answerSuccess} >回答成功</Toast>
        <Toast  icon="loading" show={this.state.status==1} >开启中</Toast>
        <Toast  icon="loading" show={this.state.status==3} >停止中</Toast>
        <Alert show={this.state.showAlert} title="提示" buttons={this.state.alert.buttons}>{this.state.alertContent}</Alert>
        <Confirm show={this.state.showConfirm} title="提示" buttons={this.state.confirm.buttons}>{this.state.confirmText}</Confirm>
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
        <div className="replyHint">{Tips[this.state.status]}</div>
        <div ref="replyContainer" className="replyContainer">
          <div ref="roundContainer" className={"round-container "+classNames[this.state.status]}>
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
Answer = withRouter(Answer)

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