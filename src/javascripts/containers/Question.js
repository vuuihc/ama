/**
 * Created by zhushihao on 2016/6/14.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getQuestionInfo,getListenInfo} from '../actions/question.js'
import VoiceWave from "../components/VoiceWave"
import '../../stylesheets/partials/modules/Question.scss'

class Question extends Component {
  constructor(props){
    super(props)
    this.state={
      playing: false,
      answerAudio:null
    }
  }
  componentDidMount() {
    const {id} = this.props.params
    this.props.dispatch(getQuestionInfo(id))
    console.log("questionInfo===" + this.props.questionInfo)
    console.log("listenInfo===" + this.props.listenInfo)
  }
  getPrepayInfo(answerId){
    this.props.dispatch(getListenInfo(answerId))
  }
  bubbleClick(){
    console.log("this.state.answerAudio")
    console.log(this.state.answerAudio)
    if(this.state.answerAudio!=null){
      this.playAudio(this.state.answerAudio)
    }else{
      const answerId = this.props.params.id
      this.getPrepayInfo(answerId)
    }
  }
  componentWillReceiveProps(nextProps){
    const self = this
    const answerId = this.props.params.id
    if(nextProps.listenInfo.data.timeStamp!=undefined){
      const time = new Date()
      if(time.valueOf()/1000-nextProps.listenInfo.data.timeStamp<5){
        console.log("进入微信支付")
        wx.chooseWXPay({
          timestamp:nextProps.listenInfo.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: nextProps.listenInfo.data.nonceStr, // 支付签名随机串，不长于 32 位
          package: nextProps.listenInfo.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: nextProps.listenInfo.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: nextProps.listenInfo.data.paySign, // 支付签名
          success: function (res) {
            console.log("支付成功！");
            self.props.dispatch(getListenInfo(answerId))
          },
          fail:function(res){
            alert("支付失败")
            console.log("失败原因：")
            console.log(res)
          }
        });
      }
    }else if(nextProps.listenInfo.data.url!=undefined){
      console.log("nextProps.listenInfo.data")
      console.log(nextProps.listenInfo.data)
      const time = new Date().valueOf()
      const answerId = this.props.params.id
      if(nextProps.listenInfo.data.question_id==answerId && time-nextProps.listenInfo.timeStamp<500){
        const answerAudio = new Audio(nextProps.listenInfo.data.url)
        this.setState({answerAudio:answerAudio})
        this.playAudio(answerAudio) 
      }
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

  render() {
    const {questionInfo,listenInfo} = this.props
    return (
      <main className="question">
        <div className="question-content">
          {questionInfo.question_content}
        </div>
        <div className="tutor">
          <img src={questionInfo.teacher_face}/>
          <h3 >{questionInfo.teacher_name}</h3>
          <h4 >{questionInfo.teacher_company+"　"+questionInfo.teacher_position}  </h4>
        </div>
        <div className="answer" onClick={this.bubbleClick.bind(this)}>
            <span className="bubble">
                <span className="bubble-tail"></span>
              {this.state.playing ? <VoiceWave /> : <span className="bubble-voice"></span>}
              <span className="bubble-text">{questionInfo.answer_ispayed?"点击播放":`${questionInfo.question_prize}元偷偷听`}</span>
            </span>
        </div>
        <div className="remark">
          <span>{questionInfo.answer_listen}人偷听</span>
          <span className="kui">{questionInfo.answer_like}人觉得赞</span>
        </div>
        <div className="ask">
          <div className="value">￥{questionInfo.teacher_prize}</div>
          <Link className="bottom-btn" to={"tutor/"+questionInfo.teacher_id}>向TA提问</Link>
        </div>
      </main>
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