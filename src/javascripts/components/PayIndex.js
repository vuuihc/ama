/**
 * Created by zhushihao on 2016/10/31.
 */
import React, {Component} from 'react';
import {browserHistory,Link} from "react-router"
import {domain,baseUrl} from "../api/config"
import message from "../util/weui/message"
import Toast from "../util/weui/toast"
import fetch from 'isomorphic-fetch'

export default class PayIndex extends Component {
    constructor() {
        super();
        this.state={
            loading:true
        }
    }
    componentWillMount(){
        const {type,successUrl,failUrl} = this.props.location.query
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        console.log(window.landPage.indexOf("pay"))
        if(isiOS && window.landPage.indexOf("pay")==-1){
            console.log("刷新")
            location.reload(true)
        }
        let payUrl;
        if(type==="question"){
            const {answerId} = this.props.location.query
            payUrl = `${domain}/api/v1/answer/listen?answer_id=${answerId}`
        }else if(type==="tutor"){
            const {content,tutorId} = this.props.location.query
            payUrl = `${domain}/api/v1/question/testquestion?content=${content}&answer_user_id=${tutorId}`
        }
        fetch(payUrl, {
          credentials: 'same-origin'
        })
          .then(response => response.json())
          .then(json => {
              if(json.errCode==0){
                  this.setState({loading: false})
                  const time = new Date()
                  if(time.valueOf()/1000-json.data.timeStamp<30){
                    console.log("进入微信支付")
                    // message.loading("请求中")
                    function onBridgeReady(){
                      WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', json.data,
                        function(res){
                          if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                            // self.setState({paySuccess:true});
                            message.success("支付成功",1,()=>{
                                browserHistory.push(successUrl);
                            })
                            // self.state.listenTimer = setTimeout(() => self.props.dispatch(getQuestionInfo(answerId)),1000);
                            // self.setState({playNow: false})
                          }else{
                            console.log(res)
                            // self.setState({alertContent:"支付失败",showAlert:true})
                            message.alert("支付失败，请重试",()=>{
                                browserHistory.push(failUrl)
                            })
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
                }else{
                    console.log("时间戳不一致")
                    console.log(`time ${time.valueOf()/1000} timeStamp ${json.data.timeStamp} diff ${time.valueOf()/1000-json.data.timeStamp}`)
                    location.reload(true)
                }
                }
          })
    }
    render(){
        return (
            <Toast icon="loading" show={this.state.loading}>请求支付中</Toast>
        )
    }
}
