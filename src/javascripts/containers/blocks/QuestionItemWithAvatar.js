import React, {Component} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Toast from "../../util/weui/toast"
import {domain, baseUrl} from "../../api/config"
import {browserHistory} from 'react-router'
import apiHandler from "../../util/apiHandler"
import {handlePaid} from '../../actions/question'
import '../../../stylesheets/partials/modules/QuestionItemWithAvatar.scss'
import Alert from "../../util/weui/alert"

class QuestionItemWithAvatar extends Component {
  constructor() {
    super();
    this.state = {
        loading: false,
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
        alertContent:''
    }
  }

  bubbleClick(answerId, questionId, isPayed) {
    const self = this;
    if (isPayed) {
      browserHistory.push(`${baseUrl}question/${questionId}`)
    } else {
      //取预支付订单
      self.setState({loading: true});
      fetch(`${domain}/api/v1/answer/listen?answer_id=${answerId}`, {
        credentials: 'same-origin'
      })
        .then(response => response.json())
        .then(json => apiHandler.handleResponse(json, (data)=> {
          self.setState({loading: false});
          if (data.timeStamp != undefined) {
            const time = new Date()
            // alert('nexstate:' + data.timeStamp + '' + (time.valueOf()/1000 - data.timeStamp));
            if (time.valueOf() / 1000 - data.timeStamp < 1000) {
              console.log("进入微信支付")
              // alert('enter pay');
              function onBridgeReady() {
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', data,
                  function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      console.log("支付成功！")
                      this.props.handlePaid(index);
                      browserHistory.push(`${baseUrl}question/${questionId}`)
                    } else {
                      // browserHistory.push(`${baseUrl}question/${questionId}`)
                      self.setState({alertContent:"支付失败",showAlert:true})
                    //   alert("支付失败，原因：" + JSON.stringify(res))
                    }
                    if (document.removeEventListener) {
                      document.removeEventListener('WeixinJSBridgeReady', onBridgeReady);
                    } else if (document.attachEvent) {
                      document.detachEvent('WeixinJSBridgeReady', onBridgeReady);
                      document.detachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                  }
                );
              }

              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              } else {
                onBridgeReady();
              }

            } else if (data.url != undefined) {
              // this.context.router.push(`question/${self.state.curQuestionId}`)
            }
          }

        }))
    }
  }
  hideAlert(){
      this.setState({showAlert:false})
    }
  render() {
    const {question} = this.props;
    console.log("question is ====")
    console.log(question)
    return (
      <article className="question-item-with-avatar">
        <Alert show={this.state.showAlert} title={this.state.alert.title} buttons={this.state.alert.buttons} >{this.state.alertContent}</Alert>
        <Toast icon="loading" show={this.state.loading}>正在请求……</Toast>
        <Link to={baseUrl +"question/"+question.question_id}>
          <div className="question-content">
            <h4>{question.question_content}</h4>
          </div>
        </Link>
        <Link to={baseUrl+"tutor/"+question.teacher_id}>
          <div className="mentor">
            <img src={question.teacher_face.slice(0, -1) + '64'}/>
            <div className="mentor-info">
              <span className="name">{question.teacher_name}</span>
              <span>{question.teacher_position}</span>
            </div>
          </div>
        </Link>
        <div className="answer">
                <span className="bubble"
                      onClick={this.bubbleClick.bind(this,question.answer_id,question.question_id,question.answer_ispayed)}>
                  <span className="bubble-tail"></span>
                  <span className="bubble-voice"></span>
                  <span className="bubble-text">{question.answer_ispayed ? "点击偷偷听" : "1元偷偷听"}</span>
                </span>
        </div>
        <Link to={baseUrl +"question/"+question.question_id}>
          <div className="remark">
            <div className="value">价值￥{question.question_prize}</div>
            <div className="remark-info">
              <span>{question.answer_listen}人偷听</span>
              <span className="kui">{question.answer_like}人觉得赞</span>
            </div>
          </div>
        </Link>
      </article>
  )
  }
  }

  QuestionItemWithAvatar.defaultProps = {
    question:{},
    index:0
  }
  QuestionItemWithAvatar = connect(undefined, {handlePaid})(QuestionItemWithAvatar)
  export default QuestionItemWithAvatar;
