webpackHotUpdate(0,{199:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(3),u=a(s),c=n(18),d=n(16),f=n(89),p=n(22),m=n(90),h=a(m),b=function(e){function t(){o(this,t);var e=r(this,Object.getPrototypeOf(t).call(this));return e.state={curQuestionId:null,curAnswerId:null},e}return i(t,e),l(t,[{key:"getPrepayInfo",value:function(e,t){this.setState({curQuestionId:e,curAnswerId:t}),this.props.dispatch((0,f.getListenInfo)(t))}},{key:"bubbleClick",value:function(e,t,n){var a=this;n?c.browserHistory.push(d.baseUrl+"question/"+t):(a.props.handleLoading(!0),fetch(d.domain+"/api/v1/answer/listen?answer_id="+e,{credentials:"same-origin"}).then(function(e){return e.json()}).then(function(e){return h["default"].handleResponse(e,function(e){if(a.props.handleLoading(!1),void 0!=e.timeStamp){var t=new Date;alert("nexstate:"+e.timeStamp+(t.valueOf()/1e3-e.timeStamp)),t.valueOf()/1e3-e.timeStamp<1e3?!function(){var t=function n(){WeixinJSBridge.invoke("getBrandWCPayRequest",e,function(e){"get_brand_wcpay_request:ok"==e.err_msg?(console.log("支付成功！"),c.browserHistory.push("/question/"+a.state.curQuestionId)):alert("支付失败，原因："+JSON.stringify(e)),document.removeEventListener?document.removeEventListener("WeixinJSBridgeReady",n):document.attachEvent&&(document.detachEvent("WeixinJSBridgeReady",n),document.detachEvent("onWeixinJSBridgeReady",n))})};console.log("进入微信支付"),alert("enter pay"),"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",t,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",t),document.attachEvent("onWeixinJSBridgeReady",t)):t()}():void 0!=e.url}})}))}},{key:"render",value:function(){var e=this.props.question;return u["default"].createElement("article",null,u["default"].createElement(c.Link,{to:d.baseUrl+"question/"+e.question_id},u["default"].createElement("div",{className:"question-content"},u["default"].createElement("h4",null,e.question_content))),u["default"].createElement(c.Link,{to:d.baseUrl+"tutor/"+e.teacher_id},u["default"].createElement("div",{className:"mentor"},u["default"].createElement("img",{src:e.teacher_face}),u["default"].createElement("div",{className:"mentor-info"},u["default"].createElement("span",{className:"name"},e.teacher_name),u["default"].createElement("span",null,e.user_title)))),u["default"].createElement("div",{className:"answer"},u["default"].createElement("span",{className:"bubble",onClick:this.bubbleClick.bind(this,e.answer_id,e.question_id,e.answer_ispayed)},u["default"].createElement("span",{className:"bubble-tail"}),u["default"].createElement("span",{className:"bubble-voice"}),u["default"].createElement("span",{className:"bubble-text"},e.answer_ispayed?"点击偷偷听":"1元偷偷听"))),u["default"].createElement("div",{className:"remark"},u["default"].createElement("div",{className:"value"},"价值￥",e.question_prize),u["default"].createElement("div",{className:"remark-info"},u["default"].createElement("span",null,e.answer_listen,"人偷听"),u["default"].createElement("span",{className:"kui"},e.answer_like,"人觉得赞"))))}}]),t}(s.Component);b=(0,p.connect)(void 0)(b),t["default"]=b},285:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){return{hotQuestionList:e.hotQuestionList,listenInfo:e.listenInfo,landPage:e.landPage}}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=n(3),c=a(u),d=n(22),f=n(89),p=n(197),m=n(73),h=a(m),b=n(91),y=a(b),v=n(199),g=a(v);n(609);var E=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,e));return n.state={curAudio:"",curPage:1,loading:!1},n.handleScroll=n.handleScroll.bind(n),n.handleLoading=n.handleLoading.bind(n),n}return i(t,e),s(t,[{key:"handleScroll",value:function(){if(window.scrollY+window.innerHeight==document.body.clientHeight&&!this.props.hotQuestionList.completed){var e=++this.state.curPage;this.setState({curPage:e}),this.props.dispatch((0,f.getHotQuestionList)(e,10))}}},{key:"handleLoading",value:function(e){this.setState({loading:e})}},{key:"componentDidMount",value:function(){null==this.props.landPage&&this.props.dispatch((0,p.setLandPage)(location.href)),this.props.dispatch((0,f.getHotQuestionList)(1,10)),document.addEventListener("scroll",this.handleScroll)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("scroll",this.handleScroll),console.log(this.refs)}},{key:"render",value:function(){var e=this,t=this.props,n=t.hotQuestionList;return t.listenInfo,c["default"].createElement("main",{className:"hot-question-list"},c["default"].createElement(y["default"],{icon:"loading",show:this.state.loading},"正在请求……"),n.data.map(function(t,n){return c["default"].createElement(g["default"],{question:t,key:n,handleLoading:e.handleLoading})}),!n.completed&&c["default"].createElement(h["default"],null))}}]),t}(u.Component);E.propTypes={hotQuestionList:u.PropTypes.shape({}).isRequired,listenInfo:u.PropTypes.shape({data:u.PropTypes.shape({}).isRequired}).isRequired},E.contextTypes={router:u.PropTypes.object},t["default"]=(0,d.connect)(l)(E)}});
//# sourceMappingURL=0.1936433de178052a0721.hot-update.js.map