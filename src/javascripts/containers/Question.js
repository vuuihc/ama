/**
 * Created by zhushihao on 2016/6/14.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getQuestionInfo, priseQuestion} from '../actions/question.js'
import VoiceWave from "../components/VoiceWave"
import Toast from "../util/weui/toast"
import {baseUrl,domain} from "../api/config"
import '../../stylesheets/partials/modules/Question.scss'
import Loading from "./Loading"
class Question extends Component {
  constructor(props){
    super(props)
    this.state={
      playing: 0,
      answerAudio:null,
      curAnswerId:null,
      playNow: true,
      listenTimer:null,
    }
    this.handlePrise = this.handlePrise.bind(this);
  }
  componentDidMount() {
    const {id} = this.props.params
    this.props.getQuestionInfo(id);
  }
  componentWillReceiveProps(nextProps){
    const self = this
    const answerId = this.props.params.id
    // if(nextProps.listenInfo.data.timeStamp!=undefined){
    //   const time = new Date()
    //   if(time.valueOf()/1000-nextProps.listenInfo.data.timeStamp<5){
    //     console.log("进入微信支付")
    //     function onBridgeReady(){
    //       WeixinJSBridge.invoke(
    //         'getBrandWCPayRequest', nextProps.listenInfo.data,
    //         function(res){
    //           if(res.err_msg == "get_brand_wcpay_request:ok" ) { 
    //             console.log("支付成功！")
    //             self.state.listenTimer = setTimeout(() => self.props.dispatch(getListenInfo(answerId)),1000);
    //             self.setState({playNow: false})
    //           }else{
    //             console.log(res)
    //             alert("支付失败，原因："+JSON.stringify(res))
    //             //     console.log("失败原因：")
    //           }
    //           if( document.removeEventListener ){
    //             document.removeEventListener('WeixinJSBridgeReady', onBridgeReady);
    //           }else if (document.attachEvent){
    //             document.detachEvent('WeixinJSBridgeReady', onBridgeReady);
    //             document.detachEvent('onWeixinJSBridgeReady', onBridgeReady);
    //           }
    //           // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
    //         }
    //       );
    //     }
    //     if (typeof WeixinJSBridge == "undefined"){
    //       if( document.addEventListener ){
    //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    //       }else if (document.attachEvent){
    //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    //       }
    //     }else{
    //       onBridgeReady();
    //     }
    //   }
    // }else if(nextProps.listenInfo.data.url!=undefined){
    //   console.log("nextProps.listenInfo.data")
    //   console.log(nextProps.listenInfo.data)
    //   const time = new Date().valueOf()
    //   const questionId = this.props.params.id
    //   if(nextProps.listenInfo.data.question_id==questionId && time-nextProps.listenInfo.timeStamp<500){
    //     const answerAudio = new Audio(nextProps.listenInfo.data.url)
    //     console.log("get audio===="+nextProps.listenInfo.data.url)
    //     this.setState({answerAudio:answerAudio})
    //     this.props.dispatch(getQuestionInfo(nextProps.listenInfo.data.question_id))
    //     if(this.state.playNow){
    //       this.setState({playing:1})
    //       this.playAudio(answerAudio)
    //     }
    //   }
    // }
  }
  componentWillUnmount(){
    const self = this
    clearTimeout(self.state.listenTimer);
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
                    self.setState({paySuccess:true})
                    // self.state.listenTimer = setTimeout(() => self.props.dispatch(getQuestionInfo(answerId)),1000);
                    // self.setState({playNow: false})
                  }else{
                    console.log(res)
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
    // if (window.WeixinJSBridge) {
    //   wx.getNetworkType({
    //     success: function (res) {
    //       answerAudio.play();
    //     },
    //     fail: function (res) {
    //       answerAudio.play();
    //     }
    //   });
    // }else{
    //   document.addEventListener("WeixinJSBridgeReady", function() {
    //     wx.getNetworkType({
    //       success: function (res) {
    //         answerAudio.play();
    //       },
    //       fail: function (res) {
    //         answerAudio.play();
    //       }
    //     });
    //   }, false);
    // }
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
    this.props.priseQuestion(answerId);
  }
  render() {
    const {questionInfo} = this.props
    console.log("this.state.playing=="+this.state.playing)
    const classNames = {
      0: " ",
      1: " playing"
    }
    
    return ( questionInfo.question_content ? 
      <main className="question">
        <Toast icon="loading" show={this.state.loading} >{(questionInfo.answer_ispayed || this.state.paySuccess)?"加载声音中……":"请求支付中……"}</Toast>
        <Link to = {`${baseUrl}user/${questionInfo.user_id}`} >
          <div className="userInfo">
            <img src={questionInfo.user_face} />
            <span>{questionInfo.user_name}</span>
          </div>
        </Link>
        <div className="question-content">
          {questionInfo.question_content}
        </div>
        {
          questionInfo.isAnswered == '1' ? (
            <div>
              <div className="tutor">
                <img src={questionInfo.teacher_face}/>
                <h3 >{questionInfo.teacher_name}</h3>
                <h4 >{questionInfo.teacher_company+"　"+questionInfo.teacher_position}  </h4>
              </div>
              <div className="answer" onClick={this.bubbleClick.bind(this,questionInfo.answer_id,questionInfo.answer_ispayed)}>
                <span className={`bubble${classNames[this.state.playing]}`}>
                <span className="bubble-tail"></span>
                <VoiceWave />
                <span className="bubble-voice"></span>
                <span className="bubble-text">{(questionInfo.answer_ispayed || this.state.paySuccess)?(this.state.playing==1?"正在播放":"点击播放"):`${questionInfo.question_prize}元偷偷听`}</span>
              </span>
              </div>
            </div>): null
        }

        <div className="remark">
          <span>{questionInfo.answer_listen}人偷听</span>
          <span className="kui">{questionInfo.answer_like}人觉得赞</span>
          {
            questionInfo.answer_isliked === 0
            ? <div className="prise" onClick={() => {this.handlePrise(questionInfo.answer_id)}}>
                <div><i className="iconfont icon-zanNo" /></div>
                <div className="desc">赞</div>
              </div>
            : <div className="prise">
                <div><i className="iconfont icon-zanYes" /></div>
                <div className="desc">已赞</div>
              </div>
          }
        </div>
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
    getQuestionInfo
  }
)(Question)