/**
 * create by wuwq
 */
import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import {connect} from 'react-redux';
import '../../stylesheets/partials/modules/App.scss';
import {baseUrl} from "../api/config"
import {setLandPage} from '../actions/config.js'
import SearchBar from "../containers/SearchBar"
import SearchTips from "../containers/SearchTips"
import { getWXConfig, configSuccess } from "../actions/config"

class App extends Component {
  constructor() {
    super();
    this.configUrlList = []
  }
  componentDidMount(){
      if(this.props.landPage==null){
        this.props.dispatch(setLandPage(location.href))
      }
      this.configUrlList.push(
          "http://h5app.7dyk.com/ama/7dyk/",
          this.props.landPage,
          location.href
      )
      if(!this.props.WXConfig.success){
          this.refreshWXConfig()
      }
      wx.error(function(res){
          self.refreshWXConfig()
      });
      let self = this
      wx.ready(function(){
          if(!self.props.WXConfig.success){
              self.props.dispatch(configSuccess())
          }
          wx.onMenuShareAppMessage({
              title: '［7点问答］问师兄，问师姐，问前辈', // 分享标题
              desc: '大学生职场问答平台，对于即将到来的秋招，你的问题都可以在这里解决。', // 分享描述
              link: location.href, // 分享链接
              imgUrl: require("../../images/logo.jpg"), // 分享图标
              success: function () {
                //   alert("分享成功")// 用户确认分享后执行的回调函数
              },
              fail: function(err){
                //   alert("分享失败，原因是"+err)
              },
              cancel: function () {
                  // alert("分享失败")// 用户取消分享后执行的回调函数
              }
          });
      })
  }
  refreshWXConfig(){
    let url = this.configUrlList.pop()
    if(url !== undefined){
        this.props.dispatch(getWXConfig(url))
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.WXConfig.data.timestamp){
      const now = new Date().valueOf()
      if(now/1000 - nextProps.WXConfig.data.timestamp<3){
        const jsApiList = [
            'startRecord',
            'stopRecord',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'chooseWXPay',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
        const newWxConfig = {}
        newWxConfig['debug'] = false;
        newWxConfig['appId'] = nextProps.WXConfig.data['appId'];
        newWxConfig['timestamp'] = nextProps.WXConfig.data.timestamp.toString();
        newWxConfig['nonceStr'] = nextProps.WXConfig.data['nonceStr'];
        newWxConfig['signature'] = nextProps.WXConfig.data['signature'];
        newWxConfig['jsApiList'] = jsApiList;
        wx.config(newWxConfig)
      }
    }
  }
  render() {
    return (
      <div>
        <div className="app-container" ref="content">{ this.props.children }</div>
        <div className="footer">
          <ul>
            <li><IndexLink activeClassName='active' to={baseUrl}>热点</IndexLink></li>
            <li><Link activeClassName='active' to={baseUrl+"tutor"}>导师</Link></li>
            <li><Link activeClassName='active' to={baseUrl+"account"}>我的</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}
App = connect(state=>({
    landPage: state.landPage,
    WXConfig:state.WXConfig
}))(App);
export default App;
