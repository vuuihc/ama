webpackHotUpdate(0,{199:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(3),u=a(s),c=n(18),d=n(16),f=n(89),m=n(22),p=function(e){function t(){r(this,t);var e=i(this,Object.getPrototypeOf(t).call(this));return e.state={curQuestionId:null,curAnswerId:null},e}return o(t,e),l(t,[{key:"getPrepayInfo",value:function(e,t){this.setState({curQuestionId:e,curAnswerId:t}),this.props.dispatch((0,f.getListenInfo)(t))}},{key:"bubbleClick",value:function(e,t,n){n?c.browserHistory.push(d.baseUrl+"question/"+t):this.getPrepayInfo(t,e)}},{key:"componentWillReceiveProps",value:function(e){var t=this;if(console.log(e.listenInfo.data),alert("get nextstate"),void 0!=e.listenInfo.data.timeStamp){var n=new Date;n.valueOf()/1e3-e.listenInfo.data.timeStamp<1e3?!function(){var n=function a(){WeixinJSBridge.invoke("getBrandWCPayRequest",e.listenInfo.data,function(e){"get_brand_wcpay_request:ok"==e.err_msg?(console.log("支付成功！"),c.browserHistory.push("/question/"+t.state.curQuestionId)):alert("支付失败，原因："+JSON.stringify(e)),document.removeEventListener?document.removeEventListener("WeixinJSBridgeReady",a):document.attachEvent&&(document.detachEvent("WeixinJSBridgeReady",a),document.detachEvent("onWeixinJSBridgeReady",a))})};console.log("进入微信支付"),"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",n,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",n),document.attachEvent("onWeixinJSBridgeReady",n)):n()}():void 0!=e.listenInfo.data.url}}},{key:"render",value:function(){var e=this.props.question;return u["default"].createElement("article",null,u["default"].createElement(c.Link,{to:d.baseUrl+"question/"+e.question_id},u["default"].createElement("div",{className:"question-content"},u["default"].createElement("h4",null,e.question_content))),u["default"].createElement(c.Link,{to:d.baseUrl+"tutor/"+e.teacher_id},u["default"].createElement("div",{className:"mentor"},u["default"].createElement("img",{src:e.teacher_face}),u["default"].createElement("div",{className:"mentor-info"},u["default"].createElement("span",{className:"name"},e.teacher_name),u["default"].createElement("span",null,e.user_title)))),u["default"].createElement("div",{className:"answer"},u["default"].createElement("span",{className:"bubble",onClick:this.bubbleClick.bind(this,e.answer_id,e.question_id,e.answer_ispayed)},u["default"].createElement("span",{className:"bubble-tail"}),u["default"].createElement("span",{className:"bubble-voice"}),u["default"].createElement("span",{className:"bubble-text"},e.answer_ispayed?"点击偷偷听":"1元偷偷听"))),u["default"].createElement("div",{className:"remark"},u["default"].createElement("div",{className:"value"},"价值￥",e.question_prize),u["default"].createElement("div",{className:"remark-info"},u["default"].createElement("span",null,e.answer_listen,"人偷听"),u["default"].createElement("span",{className:"kui"},e.answer_like,"人觉得赞"))))}}]),t}(s.Component);p=(0,m.connect)(void 0)(p),t["default"]=p}});
//# sourceMappingURL=0.6dab4abcacbe8021bc4b.hot-update.js.map