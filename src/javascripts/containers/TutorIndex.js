/**
 * Created by zhushihao on 2016/6/15.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {getTutorInfo,getTutorAnswerList,getPrepayInfo} from '../actions/tutor.js'
import QuestionItemWithoutAvatar from "./QuestionItemWithoutAvatar"
import Loading from "./Loading"

import '../../stylesheets/partials/modules/TutorIndex.scss'

class TutorIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curPage:1
    }
  }
  componentWillReceiveProps(nextProps){
    const time = new Date()
    if(nextProps.prepayInfo.timeStamp!=undefined && time.valueOf()/1000-nextProps.prepayInfo.timeStamp<5){
      console.log("获得了最新的timestamp")
      wx.chooseWXPay({
        timestamp:nextProps.prepayInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: nextProps.prepayInfo.nonceStr, // 支付签名随机串，不长于 32 位
        package: nextProps.prepayInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: nextProps.prepayInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: nextProps.prepayInfo.paySign, // 支付签名
        success: function (res) {
          console.log("支付成功！");
        }
      });
    }
  }
  getPrepayInfo(){
    const content = this.refs.content.value
    console.log("content is ==="+content)
    if(content==""){
      alert("内容不能为空哦")
      return
    }
    const {tutorInfo} = this.props
    const {id} = this.props.params
    this.props.dispatch(getPrepayInfo(1,content,id))
  }

  componentDidMount() {
    const {id} = this.props.params
    this.props.dispatch(getTutorInfo(id))
    this.props.dispatch(getTutorAnswerList(id,1,10))
    function onScroll(e) {
      if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.tutorAnswerList.completed) {
        const curPage = ++this.state.curPage;
        this.setState({curPage});
        this.props.dispatch(getTutorAnswerList(id,curPage, 10))
      }
    }
    document.addEventListener('scroll', onScroll.bind(this));
  }

  render() {
    const {tutorInfo,tutorAnswerList} = this.props
    return (
      <main className="tutor">
        <div className="tutor-info">
          <Link to="/user/share" >
            <img className="QREntry" src={require("../../images/QREntry.png")}/>
          </Link>
          <img className="avatar" src={tutorInfo.user_face}/>
          <h3 className="tutor-name">{tutorInfo.user_name}</h3>
          <h4 className="tutor-title">{tutorInfo.user_title}</h4>
          <h5 className="tutor-intro">{tutorInfo.user_introduction}</h5>
          <div className="grade">
            <div className="num">
              <span>￥{tutorInfo.teacher_income}</span>
              <span>￥{tutorInfo.listen_num}</span>
            </div>
            <div className="grade-name">
              <span>总收入</span>
              <span>被偷听</span>
            </div>
          </div>
          <textarea ref="content" placeholder={"向"+tutorInfo.user_name+"提问，等TA语音回答；超过48小时未回答，将按支付路径全额退款"}/>
          <div className="value">￥{tutorInfo.teacher_prize}</div>
          <a className="bottom-btn" onclick={this.getPrepayInfo.bind(this)}>向TA提问</a>

        </div>
        <div className="question-list">
          <h5 className="title">他还回答了这些问题</h5>
          {
            tutorAnswerList.data.map((question,index) =>
              <QuestionItemWithoutAvatar key={index} question={question}/>
            )
          }
          {!tutorAnswerList.completed && <Loading />}
        </div>
      </main>
    )
  }
}

TutorIndex.propTypes = {
  tutorInfo: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

function mapStateToProps(state) {
  return {
    tutorInfo: state.tutorInfo,
    tutorAnswerList: state.tutorAnswerList,
    prepayInfo: state.prepayInfo
  }
}

export default connect(
  mapStateToProps
)(TutorIndex)