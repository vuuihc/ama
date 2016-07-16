/**
 * Created by zhushihao on 2016/6/15.
 */
import React, {Component, PropTypes} from 'react'
import {Link,browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {getTutorInfo,getTutorAnswerList,getPrepayInfo} from '../actions/tutor.js'
import {getIAsked} from '../actions/account.js'
import QuestionItemWithoutAvatar from "./blocks/QuestionItemWithoutAvatar"
import Loading from "./Loading"
import Toast from "../util/weui/toast"
import {baseUrl,domain} from "../api/config"
import '../../stylesheets/partials/modules/TutorIndex.scss'

class TutorIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curPage:1,
      askSuccess:false,
      loading:false
    }
  }
  componentWillReceiveProps(nextProps){
    // const time = new Date()
    // const self =this
    // if(nextProps.prepayInfo.data.timeStamp!=undefined && time.valueOf()/1000-nextProps.prepayInfo.data.timeStamp<5){
    //   console.log("获得了最新的timestamp")
    //   console.log(nextProps.prepayInfo.data.timeStamp)
    //   console.log((Math.ceil(new Date().valueOf()/1000)).toString())
    //   function onBridgeReady(){
    //     WeixinJSBridge.invoke(
    //       'getBrandWCPayRequest', nextProps.prepayInfo.data,
    //       function(res){
    //         if(res.err_msg == "get_brand_wcpay_request:ok" ) {
    //           console.log("支付成功！")
    //           self.setState({askSuccess:true})
    //           this.props.dispatch(getIAsked(1, 10));
    //           self.state.successTimer = setTimeout(()=>{
    //             self.setState({askSuccess:false})
    //             browserHistory.push(baseUrl+"account/IAskedList")
    //           },2000)
    //         }else{
    //           console.log(res)
    //           alert("支付失败，原因："+JSON.stringify(res))
    //         }
    //         if( document.removeEventListener ){
    //           document.removeEventListener('WeixinJSBridgeReady', onBridgeReady);
    //         }else if (document.attachEvent){
    //           document.detachEvent('WeixinJSBridgeReady', onBridgeReady);
    //           document.detachEvent('onWeixinJSBridgeReady', onBridgeReady);
    //         }
    //        
    //         // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
    //       }
    //     );
    //   }
    //   if (typeof WeixinJSBridge == "undefined"){
    //     if( document.addEventListener ){
    //       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    //     }else if (document.attachEvent){
    //       document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
    //       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    //     }
    //   }else{
    //     onBridgeReady();
    //   }
    // }
  }
  payForAsk(content,tutorId){
    const url = domain + `/api/v1/question/testquestion?content=${content}&answer_user_id=${tutorId}`
    this.setState({loading:true})
    fetch(url,{
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json =>{
        this.setState({loading:false})
        const self =this
        if(json.data.timeStamp!=undefined){
          function onBridgeReady(){
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', json.data,
              function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                  console.log("支付成功！")
                  self.setState({askSuccess:true})
                  self.props.dispatch(getIAsked(1, 10));
                  let successTimer = setTimeout(()=>{
                    browserHistory.push(baseUrl+"account/IAskedList")
                  },2000)
                  self.setState({successTimer:successTimer})
                }else{
                  console.log(res)
                  alert("支付失败")
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
      })
  }
  askBtnClick(){
    const content = this.refs.content.value
    console.log("content is ==="+content)
    if(content==""){
      alert("内容不能为空哦")
      return
    }
    const {id} = this.props.params
    this.props.dispatch(getPrepayInfo(content,id))
    this.payForAsk(content,id)
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
  componentWillUnmount(){
    clearTimeout(this.state.successTimer)
  }

  render() {
    const {tutorInfo,tutorAnswerList} = this.props
    return (
      <main className="tutorIndex">
        <Toast  show={this.state.askSuccess} >提问成功</Toast>
        <Toast  icon="loading" show={this.state.loading} >请求支付中……</Toast>
        <div className="tutor-info">
          <Link to={baseUrl+`tutor/share/${tutorInfo.user_id}`} >
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
          <textarea ref="content" placeholder={"向"+tutorInfo.user_name+"提问，等TA语音回答；超过24小时未回答，将按支付路径全额退款"}/>
          <div className="value">￥{tutorInfo.teacher_prize}</div>
          <a className="bottom-btn" onClick={this.askBtnClick.bind(this)}>向TA提问</a>

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
  tutorInfo: PropTypes.shape({}).isRequired,
}
TutorIndex.contextTypes = {
  router: PropTypes.object
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