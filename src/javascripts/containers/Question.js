/**
 * Created by zhushihao on 2016/6/14.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getQuestionInfo, priseQuestion, cancelPriseQuestion, clearQuesiton} from '../actions/question.js'
import VoiceWave from "../components/VoiceWave"
import Toast from "../util/weui/toast"
import {baseUrl,domain} from "../api/config"
import '../../stylesheets/partials/modules/Question.scss'
import Loading from "./Loading"
import Alert from "../util/weui/alert"
class Question extends Component {
  constructor(props){
    super(props)
    this.state={
      playing: 0,
      answerAudio:null,
      curAnswerId:null,
      playNow: true,
      listenTimer:null,
      showAlert:false,
      alert:{
        title:"提示",
        buttons:[
          {
            type: 'default',
            label: '确定',
            onClick: this.hideAlert.bind(this)
          }
        ]
      },
      alertContent:'',
    }
    this.handlePrise = this.handlePrise.bind(this);
    this.handleCanclePrise = this.handleCanclePrise.bind(this);
  }
  componentDidMount() {
    const {id} = this.props.params
    this.props.getQuestionInfo(id);
  }
  componentWillUnmount(){
    const self = this
    clearTimeout(self.state.listenTimer)
    if(this.state.answerAudio!=null){
        this.state.answerAudio.pause()
        this.state.answerAudio.currentTime=0
    }
    this.setState({answerAudio:null})
    this.props.clearQuesiton()

  }
  getListenInfo(answerId,cb) {
    fetch(`${domain}/api/v1/answer/listen?answer_id=${answerId}`, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => cb(json))
  }

  payForAnswer(answerId){
    const self = this
    this.setState({loading: true})
    this.getListenInfo(answerId,json => {
        if(json.errCode==0){
          this.setState({loading: false})
          const time = new Date()
          if(time.valueOf()/1000-json.data.timeStamp<5){
            console.log("进入微信支付")
            function onBridgeReady(){
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', json.data,
                function(res){
                  if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    self.setState({paySuccess:true});
                    self.props.getQuestionInfo(self.props.questionInfo.question_id);
                    // self.state.listenTimer = setTimeout(() => self.props.dispatch(getQuestionInfo(answerId)),1000);
                    // self.setState({playNow: false})
                  }else{
                    console.log(res)
                    self.setState({alertContent:"支付失败",showAlert:true})
                    // alert("支付失败，原因："+JSON.stringify(res))
                    //     console.log("失败原因：")
                  }
                  if( document.removeEventListener ){
                    document.removeEventListener('WeixinJSBridgeReady', onBridgeReady);
                  }else if (document.attachEvent){
                    document.detachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.detachEvent('onWeixinJSBridgeReady', onBridgeReady);
                  }
                  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                }
              );
            }
            if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            }else{
              onBridgeReady();
            }
          }
        }
      })
  }
  getAudio(answerId){
    const self =this
    this.setState({loading: true})
    this.getListenInfo(answerId,json => {
      this.setState({loading: false})
      if(json.data.timeStamp){
        setTimeout(function(){//todo 优化
          self.getAudio(answerId)
        },500)
      }else if(json.data.url){
        const questionId = this.props.params.id
        if(json.data.question_id==questionId){
          const answerAudio = new Audio(json.data.url)
          self.setState({answerAudio:answerAudio})
          self.playAudio(answerAudio)
        }
      }
    })
  }
  playAudio(answerId,answerAudio){
    let audio = this.state.answerAudio || answerAudio
    if(audio){
      console.log("audio.src===="+audio.src)
      audio.play();//todo 优化
    }else{
      this.getAudio(answerId)
    }
  }
  bubbleClick(answerId,isPayed){
    if(this.state.paySuccess || isPayed ){
      this.setState({playing:1})
      this.playAudio(answerId)
    }else{
      this.payForAnswer(answerId)
    }
  }
  handlePrise(answerId){
    if(!this.props.questionInfo.answer_ispayed&&!this.state.paySuccess){
        this.setState({alertContent:"您还没有听过该问题",showAlert:true})
    }else{
        this.props.priseQuestion(answerId);
    }
  }
  handleCanclePrise(answerId){
    this.props.cancelPriseQuestion(answerId);
  }
  hideAlert(){
    this.setState({showAlert:false})
  }
  render() {
    const {questionInfo} = this.props
    // console.log("this.state.playing=="+this.state.playing)
    const classNames = {
      0: " ",
      1: " playing"
    }

    return ( questionInfo.user_face ?
      <main className="question">
        <Alert show={this.state.showAlert} title={this.state.alert.title} buttons={this.state.alert.buttons} >{this.state.alertContent}</Alert>
        <Toast icon="loading" show={this.state.loading} >{(questionInfo.answer_ispayed || this.state.paySuccess)?"加载声音中……":"请求支付中……"}</Toast>
        <Link to = {`${baseUrl}user/${questionInfo.user_id}`} >
          <div className="userInfo">
            <img src={questionInfo.user_face.slice(0, -1) + '132'} />
            <span>{questionInfo.user_name}</span>
            {/*<div className="share">问题不错,快分享出去吧！<i className="iconfont icon-arrow" /></div>*/}
          </div>
        </Link>
        <div className="question-content">
          {questionInfo.question_content}
        </div>
        <div className="tutor">
          <img src={questionInfo.teacher_face.slice(0, -1) + '132'}/>
          <h3 >{questionInfo.teacher_name}</h3>
          <h4 >{questionInfo.teacher_company+"　"+questionInfo.teacher_position}  </h4>
        </div>

        {
          questionInfo.isanswered == '1' ? (
            <div>
              <div className="answer" onClick={this.bubbleClick.bind(this,questionInfo.answer_id,questionInfo.answer_ispayed)}>
                <span className={`bubble${classNames[this.state.playing]}`}>
                <span className="bubble-tail"></span>
                <VoiceWave />
                <span className="bubble-voice"></span>
                <span className="bubble-text">{(questionInfo.answer_ispayed || this.state.paySuccess)?(this.state.playing==1?"正在播放":"点击播放"):`${questionInfo.question_prize}元偷偷听`}</span>
              </span>
              </div>
              <div className="remark">
                <span>{questionInfo.answer_listen}人偷听</span>
                <span className="kui">{questionInfo.answer_like}人觉得赞</span>
                {
                  questionInfo.answer_isliked === 0
                    ? <div className="prise" onClick={() => {this.handlePrise(questionInfo.answer_id)}}>
                    <div><i className="iconfont icon-zanNo" /></div>
                    {/*<div className="desc">赞</div>*/}
                  </div>
                    : <div className="prise" onClick={() => {this.handleCanclePrise(questionInfo.answer_id)}}>
                    <div><i className="iconfont icon-zanYes" /></div>
                    {/*<div className="desc">已赞</div>*/}
                  </div>
                }
              </div>
            </div>) : (<div className="not-answer">等待老师回答……</div>)
        }


        <div className="ask">
          <div className="value">￥{questionInfo.teacher_prize}</div>
          <Link className="bottom-btn" to={baseUrl+"tutor/"+questionInfo.teacher_id}>向TA提问</Link>
        </div>
      </main>
        :
      <Loading />
    )
  }
}

Question.propTypes = {
  questionInfo: PropTypes.shape({}).isRequired,
  listenInfo: PropTypes.shape({}).isRequired,
}

function mapStateToProps(state) {
  return {
    questionInfo: state.questionInfo,
    listenInfo: state.listenInfo
  }
}

export default connect(
  mapStateToProps,
  {
    priseQuestion,
    getQuestionInfo,
    cancelPriseQuestion,
    clearQuesiton
  }
)(Question)
