/**
 * Created by zhushihao on 2016/6/15.
 */
import React, {Component, PropTypes} from 'react'
import {Link,browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {getTutorInfo,getTutorAnswerList,getPrepayInfo,clearTutorIndex} from '../actions/tutor.js'
import {getIAsked} from '../actions/account.js'
import QuestionItemWithoutAvatar from "./blocks/QuestionItemWithoutAvatar"
import Loading2 from "./Loading2"
import Loading from './Loading'
import Toast from "../util/weui/toast"
import {baseUrl,domain} from "../api/config"
import '../../stylesheets/partials/modules/TutorIndex.scss'
import { withRouter } from 'react-router'
import Confirm from "../util/weui/confirm"
import Alert from "../util/weui/alert"

class TutorIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
        textLength:0,
        curPage:1,
      askSuccess:false,
      loading:false,
      showConfirm:false,
      confirm:{
        title: "提示",
        buttons:[
          {
            type:'primary',
            label:'接着提问',
            onClick: this.hideConfirm.bind(this)
          },
          {
            type:'default',
            label:'离开',
            onClick:this.leaveThisPage.bind(this)
          }
        ]
      },
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
      nextLocation:location.href,
    }
	this.routerWillLeave = this.routerWillLeave.bind(this);
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
                  self.setState({alertContent:"支付失败",showAlert:true})
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
      // alert("内容不能为空哦")
      this.setState({alertContent:'内容不能为空哦',showAlert:true})
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
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
    document.addEventListener('scroll', onScroll.bind(this));
  }

  routerWillLeave(nextLocation) {
    // return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    if(this.refs.content.value != '' && !this.state.askSuccess){
      // return '您的提问尚未支付，确认离开?'
      this.setState({nextLocation:nextLocation.pathname,showConfirm:true})
    //   console.log(nextLocation)
      return false
    }
  }
  hideConfirm(){
    this.setState({showConfirm:false})
  }
  hideAlert(){
    this.setState({showAlert:false})
  }
  leaveThisPage(){
    this.hideConfirm()
    browserHistory.push(this.state.nextLocation)
  }
  componentWillUnmount(){
    clearTimeout(this.state.successTimer);
    this.props.dispatch(clearTutorIndex());
  }
  handleTextarea(){
      const text = ReactDOM.findDOMNode(this.refs.content).value;
      console.log("textLength=="+text.length);
      this.setState({textLength: text.length})
    }
  render() {
    const {tutorInfo,tutorAnswerList} = this.props
    return (
      tutorInfo.user_face ?
      <main className="tutorIndex">
        <Toast  show={this.state.askSuccess} >提问成功</Toast>
        <Toast  icon="loading" show={this.state.loading} >请求支付中……</Toast>
        <Confirm show={this.state.showConfirm} title={this.state.confirm.title} buttons={this.state.confirm.buttons}>您的提问尚未支付，确认离开？</Confirm>
        <Alert show={this.state.showAlert} title={this.state.alert.title} buttons={this.state.alert.buttons} >{this.state.alertContent}</Alert>
        <div className="tutor-info">
          <Link to={baseUrl+`tutor/share/${tutorInfo.user_id}`} >
            <img className="QREntry" src={require("../../images/QREntry.png")}/>
          </Link>
          <img className="avatar" src={tutorInfo.user_face.slice(0, -1) + '132'}/>
          <h3 className="tutor-name">{tutorInfo.user_name}</h3>
          <h4 className="tutor-title">{tutorInfo.user_company+"  "+tutorInfo.user_position}</h4>
          <h5 className="tutor-intro">{tutorInfo.user_introduction}</h5>
          <div className="grade">
            <div className="grade-item">
              <p>￥{tutorInfo.teacher_income}</p>
              <p>总收入</p>
            </div>
            <div className="grade-item">
              <p>￥{tutorInfo.listen_num}</p>
              <p>被偷听</p>
            </div>
          </div>
          <div className="answer-text">
              <textarea ref="content" maxLength="60" onKeyup={this.handleTextarea.bind(this)} onChange={this.handleTextarea.bind(this)} placeholder={"向"+tutorInfo.user_name+"提问，等TA语音回答；超过24小时未回答，将按支付路径全额退款"}/>
              <div className="text-tips">{this.state.textLength}/60</div>
          </div>
          <div className="value">￥{tutorInfo.teacher_prize}</div>
          <a className="bottom-btn" onClick={this.askBtnClick.bind(this)}>向TA提问</a>

        </div>
        <div className="question-list">
          <h5 className="title">他还回答了这些问题</h5>
          {
            tutorAnswerList.data.map((question,index) =>
              <QuestionItemWithoutAvatar head={tutorInfo.user_face.slice(0, -1) + '132'} key={index} question={question}/>
            )
          }
           <Loading2 completed={tutorAnswerList.completed} />
        </div>
      </main>
      : <Loading/>
    )
  }
}

TutorIndex = withRouter(TutorIndex)

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
    prepayInfo: state.prepayInfo,
  }
}

export default connect(
  mapStateToProps
)(TutorIndex)
