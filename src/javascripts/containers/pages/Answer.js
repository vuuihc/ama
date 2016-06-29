import React, {Component} from 'react'
import '../../../stylesheets/partials/modules/Answer.scss';

class Answer extends Component {
  constructor(){
    super();
    this.state={
      localId: ''
    }
  }

  componentDidMount(){
    var talkBtn = document.querySelector(".replyContainer")
    var localId;
    function uploadVoice(){
      //调用微信的上传录音接口把本地录音先上传到微信的服务器
      //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
      wx.uploadVoice({
        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          console.log("上传成功了！")
          console.log("serverId is ==="+res.serverId)
          wx.playVoice({
            localId:localId
          })
          //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
          // $.ajax({
          //   url: '后端处理上传录音的接口',
          //   type: 'post',
          //   data: JSON.stringify(res),
          //   dataType: "json",
          //   success: function (data) {
          //     alert('文件已经保存到七牛的服务器');//这回，我使用七牛存储
          //   },
          //   error: function (xhr, errorType, error) {
          //     console.log(error);
          //   }
          // });
        }
      });
    }

    var recordStartHandler = function (event) {
      event.preventDefault();
      START = new Date().getTime();
      event.target.classList.add('on')
      recordTimer = setTimeout(function(){
        wx.startRecord({
          success: function(){
            localStorage.rainAllowRecord = 'true';
          },
          cancel: function () {
            alert('用户拒绝授权录音');
          }
        });
      },300);
    }
    var recordStopHandler = function (event) {
      event.preventDefault();
      END = new Date().getTime();
      event.target.classList.remove('on');
      if((END - START) < 300){
        END = 0;
        START = 0;
        //小于300ms，不录音
        clearTimeout(recordTimer);
      }else{
        wx.stopRecord({
          success: function (res) {
            localId = res.localId
            uploadVoice();
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      }
      
    }
    talkBtn.addEventListener('touchstart',recordStartHandler)
    talkBtn.addEventListener('touchend',recordStopHandler)
  }
  render() {
    return (
      <div className="accountAnswer">
        <div className="question">
          <div className="head">
            <img src={require('../../../images/head.jpg')}/>
            <span className="name">奥特曼</span>
            <span className="price">￥ 5.2</span>
          </div>
          <div className="stem">陈老师，长得太帅总是被爱怎么办，有么有什么解决办法</div>
          <div className="time">15分钟之前</div>
        </div>
        <div className="hint">您的回答将被公开，答案每被偷听一次，你就赚 ￥0.3</div>
        <div className="replyHint">语音回复</div>
        <div className="replyContainer">
          <div className="replyIcon"></div>
          <div className="recording"></div>
        </div>
        <div className="reRecord">重录</div>
        <div className="recordHint">点击开始录制最多可录制120S</div>
        <div className="sendBtn">发送</div>
      </div>
    )
  }

}

export default Answer;