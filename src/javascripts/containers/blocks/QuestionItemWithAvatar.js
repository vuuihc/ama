import React, {Component} from 'react'
import { Link } from 'react-router'
import {domain, baseUrl} from "../../api/config"
import {getListenInfo} from '../../actions/question'
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'
import apiHandler from "../../util/apiHandler"
class QuestionItemWithAvatar extends Component{
    constructor(){
        super();
    }
    bubbleClick(answerId,questionId,isPayed){
        const self = this;
        if(isPayed){
            browserHistory.push(`${baseUrl}question/${questionId}`)
        }else{
            //取预支付订单
            self.props.handleLoading(true);
            fetch(`${domain}/api/v1/answer/listen?answer_id=${answerId}`,{
                credentials: 'same-origin'
            })
                .then(response => response.json())
                .then(json => apiHandler.handleResponse(json,(data)=>{
                    self.props.handleLoading(false);
                    if(data.timeStamp!=undefined){
                        const time = new Date()
                        alert('nexstate:' + data.timeStamp + '' + (time.valueOf()/1000 - data.timeStamp));
                        if(time.valueOf()/1000-data.timeStamp<1000){
                            console.log("进入微信支付")
                            alert('enter pay');
                            function onBridgeReady(){
                                WeixinJSBridge.invoke(
                                    'getBrandWCPayRequest', data,
                                    function(res){
                                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                            console.log("支付成功！")
                                            browserHistory.push(`${baseUrl}question/${questionId}`)
                                        }else{
                                            browserHistory.push(`${baseUrl}question/${questionId}`)
                                            alert("支付失败，原因："+JSON.stringify(res))
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
                            //   timestamp:data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            //   nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                            //   package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            //   signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            //   paySign: data.paySign, // 支付签名
                            //   success: function (res) {
                            //     console.log("支付成功！");
                            //     browserHistory.push(`/question/${self.state.curQuestionId}`)
                            //     // self.props.dispatch(getListenInfo(self.state.curQuestionId))
                            //   },
                            //   fail:function(res){
                            //     alert("支付失败")
                            //     console.log("失败原因：")
                            //     console.log(res)
                            //   }
                            // });
                        }else if(data.url!=undefined){
                            // this.context.router.push(`question/${self.state.curQuestionId}`)
                        }
                    }

                }))
        }
    }
    render() {
        const { question } = this.props;
        return(
            <article>
                <Link to={baseUrl +"question/"+question.question_id}>
                    <div className="question-content">
                        <h4>{question.question_content}</h4>
                    </div>
                </Link>
                <Link to={baseUrl+"tutor/"+question.teacher_id}>
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
}
//QuestionItemWithAvatar = connect(undefined)(QuestionItemWithAvatar)
export default QuestionItemWithAvatar;