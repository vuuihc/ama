/**
 * Created by zsh on 2016/3/11.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getHotQuestionList,getListenInfo} from '../actions/question.js'
import Loading from "./Loading"
import Toast from "../util/weui/toast"
import '../../stylesheets/partials/modules/HotQuestionList.scss'

class HotQuestionList extends Component {
  constructor(props){
    super(props)
    this.state={
      curAudio:"",
      curPage:1,
      curQuestionId:null,
      curAnswerId:null,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll(){
    if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.hotQuestionList.completed) {
      const curPage = ++this.state.curPage;
      this.setState({curPage});
      this.props.dispatch(getHotQuestionList(curPage, 10))
    }
  }
  componentDidMount() {
    this.props.dispatch(getHotQuestionList(1, 10))
    document.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount(){
    document.removeEventListener('scroll', this.handleScroll);
    console.log(this.refs);
  }
  getPrepayInfo(questionId,answerId){
    this.setState({curQuestionId:questionId,curAnswerId:answerId})
    this.props.dispatch(getListenInfo(answerId))
  }
  bubbleClick(answerId,questionId,isPayed){
    if(isPayed){
      this.context.router.push(`question/${questionId}`)
    }else{
      this.getPrepayInfo(questionId,answerId)
    }
  }
  componentWillReceiveProps(nextProps){
    const self = this
    console.log(nextProps.listenInfo.data)
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
            self.context.router.push(`question/${self.state.curQuestionId}`)
            // self.props.dispatch(getListenInfo(self.state.curQuestionId))
          },
          fail:function(res){
            alert("支付失败")
            console.log("失败原因：")
            console.log(res)
          }
        });
      }else if(nextProps.listenInfo.data.url!=undefined){
        // this.context.router.push(`question/${self.state.curQuestionId}`)
      }
    }
  }
  
  render() {
    const {hotQuestionList,listenInfo} = this.props
    return (
      <main className="hot-question-list">
        <Toast icon="loading" show={listenInfo.loading} >正在请求……</Toast>
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
                <span className="bubble" onClick={this.bubbleClick.bind(this,question.answer_id,question.question_id,question.answer_ispayed)}>
                  <span className="bubble-tail"></span>
                  <span className="bubble-voice"></span>
                  <span className="bubble-text">{question.answer_ispayed?"点击偷偷听":"1元偷偷听"}</span>
                </span>
              </div>
              <div className="remark">
                <div className="value">价值￥{question.question_prize}</div>
                <div className="remark-info">
                  <span>{question.answer_listen}人偷听</span>
                  <span className="kui">{question.answer_like}人觉得赞</span>
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
  listenInfo: PropTypes.shape({
    data:PropTypes.shape({}).isRequired
  }).isRequired
}
HotQuestionList.contextTypes = {
  router: PropTypes.object
}
function mapStateToProps(state) {
  return {
    hotQuestionList: state.hotQuestionList,
    listenInfo:state.listenInfo
  }
}

export default connect(
  mapStateToProps
)(HotQuestionList)
