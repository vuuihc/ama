webpackHotUpdate(0,{199:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(3),s=a(u),c=n(18),d=n(16),f=n(90),m=a(f),p=function(e){function t(){return r(this,t),i(this,Object.getPrototypeOf(t).call(this))}return l(t,e),o(t,[{key:"bubbleClick",value:function(e,t,n){var a=this;n?c.browserHistory.push(d.baseUrl+"question/"+t):(a.props.handleLoading(!0),fetch(d.domain+"/api/v1/answer/listen?answer_id="+e,{credentials:"same-origin"}).then(function(e){return e.json()}).then(function(e){return m["default"].handleResponse(e,function(e){if(a.props.handleLoading(!1),void 0!=e.timeStamp){var n=new Date;n.valueOf()/1e3-e.timeStamp<1e3?!function(){var n=function a(){WeixinJSBridge.invoke("getBrandWCPayRequest",e,function(e){"get_brand_wcpay_request:ok"==e.err_msg?(console.log("支付成功！"),c.browserHistory.push(d.baseUrl+"question/"+t)):alert("支付失败，原因："+JSON.stringify(e)),document.removeEventListener?document.removeEventListener("WeixinJSBridgeReady",a):document.attachEvent&&(document.detachEvent("WeixinJSBridgeReady",a),document.detachEvent("onWeixinJSBridgeReady",a))})};console.log("进入微信支付"),"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",n,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",n),document.attachEvent("onWeixinJSBridgeReady",n)):n()}():void 0!=e.url}})}))}},{key:"render",value:function(){var e=this.props.question;return s["default"].createElement("article",null,s["default"].createElement(c.Link,{to:d.baseUrl+"question/"+e.question_id},s["default"].createElement("div",{className:"question-content"},s["default"].createElement("h4",null,e.question_content))),s["default"].createElement(c.Link,{to:d.baseUrl+"tutor/"+e.teacher_id},s["default"].createElement("div",{className:"mentor"},s["default"].createElement("img",{src:e.teacher_face}),s["default"].createElement("div",{className:"mentor-info"},s["default"].createElement("span",{className:"name"},e.teacher_name),s["default"].createElement("span",null,e.user_title)))),s["default"].createElement("div",{className:"answer"},s["default"].createElement("span",{className:"bubble",onClick:this.bubbleClick.bind(this,e.answer_id,e.question_id,e.answer_ispayed)},s["default"].createElement("span",{className:"bubble-tail"}),s["default"].createElement("span",{className:"bubble-voice"}),s["default"].createElement("span",{className:"bubble-text"},e.answer_ispayed?"点击偷偷听":"1元偷偷听"))),s["default"].createElement("div",{className:"remark"},s["default"].createElement("div",{className:"value"},"价值￥",e.question_prize),s["default"].createElement("div",{className:"remark-info"},s["default"].createElement("span",null,e.answer_listen,"人偷听"),s["default"].createElement("span",{className:"kui"},e.answer_like,"人觉得赞"))))}}]),t}(u.Component);t["default"]=p}});
//# sourceMappingURL=0.058569e950e93f1ad304.hot-update.js.map