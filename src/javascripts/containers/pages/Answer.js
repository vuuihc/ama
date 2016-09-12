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
import message from "../../util/weui/message"
import Loading from "../Loading"
class Answer extends Component {
  constructor(){
    super();
    this.state={
      localId: null,
      status: 0,//0:话筒等待录音，1：等待微信发起录音，2：录音中，3：等待微信停止录音，4：等待播放，5：播放中
      answerSuccess: false,
      successTimer:null,
      authorizing:false,
      uploading:false,
      START:0,
      END:0,
      canLeave: false,
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
      nextLocation:location.href
    }
    this.configUrlList= []
    this.clickHandler = this.clickHandler.bind(this)
	this.routerWillLeave = this.routerWillLeave.bind(this)
  }
  hideAlert(){
    this.setState({showAlert:false})
  }
  componentWillMount(){
    const {id} = this.props.params;
    this.props.getQuestionInfo(id);
  }
  componentDidMount(){
    this.configUrlList.push(
        "http://h5app.7dyk.com/ama/7dyk/",
        this.props.landPage,
        location.href
    )
    this.refreshWXConfig()
    const self = this
    // wx.ready(function(){
    //   console.log("allowRecord" + sessionStorage.allowRecord)
    //   if(!sessionStorage.allowRecord || sessionStorage.allowRecord !== 'true'){
    //     self.setState({authorizing:true})
    //     wx.startRecord({
    //       success: function(){
    //         sessionStorage.allowRecord = true;
    //         self.setState({authorizing:false})
    //         self.recordTimer = setTimeout(function(){
    //           wx.stopRecord();
    //         },500);
    //       },
    //       complete: function(){
    //           self.setState({authorizing:false})
    //       }
    //       cancel: function () {
    //         // alert('用户拒绝授权录音');
    //         self.setState({alertContent:"用户拒绝授权录音",showAlert:true,authorizing:false})
    //       }
    //     });
    //   }
    //
    // })
    wx.onMenuShareAppMessage({
        title: '［7点问答］问师兄，问师姐，问前辈', // 分享标题
        desc: '大学生职场问答平台，对于即将到来的秋招，你的问题都可以在这里解决。', // 分享描述
        link: location.href, // 分享链接
        imgUrl: require("../../../images/logo.jpg"), // 分享图标
        success: function () {
            alert("分享成功")// 用户确认分享后执行的回调函数
        },
        fail: function(err){
            alert("分享失败，原因是"+err)
        },
        cancel: function () {
            alert("分享失败")// 用户取消分享后执行的回调函数
        }
    });
    wx.error(function(res){
        self.refreshWXConfig()
    });
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
    if(!this.state.answerSuccess&&!this.state.canLeave){
      // return '您的回答尚未完成，确认离开?'
      this.setState({canLeave:true})
      let confirmText,self = this
      switch(this.state.status){
          case 0:
          case 1:
              confirmText = "您还未回答该问题，确认离开?"
              break
          case 2:
            let talkBtn = ReactDOM.findDOMNode(self.refs.roundContainer)
            talkBtn.click()
            confirmText = "正在录音中，确认离开?"
            break
          case 3:
          case 4:
          case 5:
            confirmText = "您的录音还未上传，确认离开?"
            break
      }
    //   this.setState({confirmText:confirmText,showConfirm:true,nextLocation:nextLocation})

        message.confirm(confirmText, "接着回答", "离开",
            () => {
                self.setState({
                    canLeave: false
                })
            },
            () => {
                browserHistory.push(nextLocation.pathname)
            }
        )
        return false
    }
    return true
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.WXConfig.data.timestamp){
      const now = new Date().valueOf()
      if(now/1000 - nextProps.WXConfig.data.timestamp<3){
        const jsApiList = [
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'onVoicePlayEnd',
          'uploadVoice',
          'chooseWXPay',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ]
        const newWxConfig = {}
        newWxConfig['debug'] = false;
        newWxConfig['appId'] = nextProps.WXConfig.data['appId'];
        newWxConfig['timestamp'] = nextProps.WXConfig.data.timestamp.toString();
        newWxConfig['nonceStr'] = nextProps.WXConfig.data['nonceStr'];
        newWxConfig['signature'] = nextProps.WXConfig.data['signature'];
        newWxConfig['jsApiList'] = jsApiList;
        wx.config(newWxConfig)
      }
    }
  }
  componentWillUnmount(){
    const self =this
    clearTimeout(this.state.successTimer)
    wx.ready(function(){
      var talkBtn = ReactDOM.findDOMNode(self.refs.roundContainer)
      talkBtn.removeEventListener('click',self.clickHandler,false)
  })

  }
  refreshWXConfig(){
    let url = this.configUrlList.pop()
    if(url !== undefined){
        this.props.getWXConfig(url)
    }
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
      if((END - self.state.START) < 1000){
        END = 0;
        // alert("录音不能小于1秒哦")
        wx.stopRecord()
        self.setState({status:0,alertContent:"录音不能少于1秒哦",showAlert:true})
        return null
      }else{
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
    self.setState({uploading:true})
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
          self.setState({uploading:false,answerSuccess:true})
          self.props.getAskedMe(1,10)
          let successTimer = setTimeout(()=>{
            browserHistory.push(baseUrl+"account/AskedMeList")
          },2000)
          self.setState({successTimer:successTimer})
        }else{
          self.setState({alertContent:"抱歉，录音上传失败",showAlert:true})
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
        questionInfo.user_face?
          <div className="account-answer">
            <Toast  show={this.state.answerSuccess} >回答成功</Toast>
            <Toast  icon="loading" show={this.state.status==1} >开启中</Toast>
            <Toast  icon="loading" show={this.state.status==3} >停止中</Toast>
            <Toast  icon="loading" show={this.state.authorizing} >获取授权</Toast>
            <Toast  icon="loading" show={this.state.uploading} >上传中</Toast>
            <Alert show={this.state.showAlert} title="提示" buttons={this.state.alert.buttons}>{this.state.alertContent}</Alert>
            <div className="answer-question">
              <div className="head">
                <Link to={`${baseUrl}user/${questionInfo.user_id}`}><img src={questionInfo.user_face.slice(0, -1) + '132'}/></Link>
                <span className="name">{questionInfo.user_name}</span>
                <span className="price">￥ {questionInfo.question_prize}</span>
              </div>
              <div className="stem">{ questionInfo.question_content}</div>
              <div className="time">{time.getTimeSpan(questionInfo.question_time)}之前</div>
            </div>
            <div className="hint">您的回答将被公开，答案每被偷听一次，你就赚 ￥0.3</div>
            <div className="replyHint">{Tips[this.state.status]}</div>
            <div ref="replyContainer" className="replyContainer">
              <div ref="roundContainer" onClick={e => this.clickHandler(e)} className={"round-container "+classNames[this.state.status]}>
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
          :<Loading />
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
