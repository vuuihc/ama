/**
 * Created by zhushihao on 2016/6/14.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getQuestionInfo,getListenInfo} from '../actions/question.js'
import VoiceWave from "../components/VoiceWave"
import Toast from "../util/weui/toast"
import {baseUrl} from "../api/config"
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
    this.props.dispatch(getQuestionInfo(id))
  }
  componentWillReceiveProps(nextProps){
    const self = this
    const answerId = this.props.params.id
    if(nextProps.listenInfo.data.timeStamp!=undefined){
      const time = new Date()
      if(time.valueOf()/1000-nextProps.listenInfo.data.timeStamp<5){
        console.log("进入微信支付")
        function onBridgeReady(){
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', nextProps.listenInfo.data,
            function(res){
              if(res.err_msg == "get_brand_wcpay_request:ok" ) { 
                console.log("支付成功！")
                self.state.listenTimer = setTimeout(() => self.props.dispatch(getListenInfo(answerId)),1000);
                self.setState({playNow: false})
              }else{
                console.log(res)
                alert("支付失败，原因："+JSON.stringify(res))
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
        // wx.chooseWXPay({
        //   timestamp:nextProps.listenInfo.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        //   nonceStr: nextProps.listenInfo.data.nonceStr, // 支付签名随机串，不长于 32 位
        //   package: nextProps.listenInfo.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        //   signType: nextProps.listenInfo.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        //   paySign: nextProps.listenInfo.data.paySign, // 支付签名
        //   success: function (res) {
        //     console.log("支付成功！");
        //     self.state.listenTimer = setTimeout(() => self.props.dispatch(getListenInfo(answerId)),1000);
        //     self.setState({playNow: false})
        //   },
        //   fail:function(res){
        //     alert("支付失败")
        //     console.log("失败原因：")
        //     console.log(res)
        //   }
        // });
      }
    }else if(nextProps.listenInfo.data.url!=undefined){
      console.log("nextProps.listenInfo.data")
      console.log(nextProps.listenInfo.data)
      const time = new Date().valueOf()
      const questionId = this.props.params.id
      if(nextProps.listenInfo.data.question_id==questionId && time-nextProps.listenInfo.timeStamp<500){
        const answerAudio = new Audio(nextProps.listenInfo.data.url)
        console.log("get audio===="+nextProps.listenInfo.data.url)
        this.setState({answerAudio:answerAudio})
        this.props.dispatch(getQuestionInfo(nextProps.listenInfo.data.question_id))
        if(this.state.playNow){
          this.setState({playing:1})
          this.playAudio(answerAudio)
        }
      }
    }
  }
  componentWillUnmount(){
    const self = this
    clearTimeout(self.state.listenTimer);
  }
  getPrepayInfo(answerId){
    this.props.dispatch(getListenInfo(answerId))
  }
  bubbleClick(answerId){
    console.log("this.state.answerAudio")
    console.log(this.state.answerAudio)
    if(this.state.answerAudio!=null){
      this.setState({playing:1})
      this.playAudio(this.state.answerAudio)
    }else{
      this.setState({curAnswerId:answerId})
      this.getPrepayInfo(answerId)
    }
  }
  playAudio(answerAudio){
    console.log("into playAudio");
    if (window.WeixinJSBridge) {
      wx.getNetworkType({
        success: function (res) {
          answerAudio.play();
        },
        fail: function (res) {
          answerAudio.play();
        }
      });
    }else{
      document.addEventListener("WeixinJSBridgeReady", function() {
        wx.getNetworkType({
          success: function (res) {
            answerAudio.play();
          },
          fail: function (res) {
            answerAudio.play();
          }
        });
      }, false);
    }
  }

  handlePrise(){

  }
  render() {
    const {questionInfo,listenInfo} = this.props
    console.log("this.state.playing=="+this.state.playing)
    const classNames = {
      0: " ",
      1: " playing"
    }
    return ( questionInfo.question_content ? 
      <main className="question">
        <Toast icon="loading" show={listenInfo.loading} >{questionInfo.answer_ispayed?"加载声音中……":"请求支付中……"}</Toast>
        <div className="question-content">
          {questionInfo.question_content}
        </div>
        <div className="tutor">
          <img src={questionInfo.teacher_face}/>
          <h3 >{questionInfo.teacher_name}</h3>
          <h4 >{questionInfo.teacher_company+"　"+questionInfo.teacher_position}  </h4>
        </div>
        <div className="answer" onClick={this.bubbleClick.bind(this,questionInfo.answer_id)}>
            <span className={`bubble${classNames[this.state.playing]}`}>
                <span className="bubble-tail"></span>
                <VoiceWave />
                <span className="bubble-voice"></span>
              <span className="bubble-text">{questionInfo.answer_ispayed?(this.state.playing==1?"正在播放":"点击播放"):`${questionInfo.question_prize}元偷偷听`}</span>
            </span>
        </div>
        <div className="remark">
          <span>{questionInfo.answer_listen}人偷听</span>
          <span className="kui">{questionInfo.answer_like}人觉得赞</span>
          <div className="prise" onClick={this.handlePrise}>
            赞
          </div>
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
  mapStateToProps
)(Question)