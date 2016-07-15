webpackHotUpdate(0,{

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(18);
	
	var _config = __webpack_require__(16);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var QuestionItemWithAvatar = function (_Component) {
	    _inherits(QuestionItemWithAvatar, _Component);
	
	    function QuestionItemWithAvatar() {
	        _classCallCheck(this, QuestionItemWithAvatar);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(QuestionItemWithAvatar).call(this));
	
	        _this.state = {
	            curQuestionId: null,
	            curAnswerId: null
	        };
	        return _this;
	    }
	
	    _createClass(QuestionItemWithAvatar, [{
	        key: 'getPrepayInfo',
	        value: function getPrepayInfo(questionId, answerId) {
	            this.setState({ curQuestionId: questionId, curAnswerId: answerId });
	            this.props.dispatch(getListenInfo(answerId));
	        }
	    }, {
	        key: 'bubbleClick',
	        value: function bubbleClick(answerId, questionId, isPayed) {
	            if (isPayed) {
	                browserHistory.push(_config.baseUrl + 'question/' + questionId);
	            } else {
	                this.getPrepayInfo(questionId, answerId);
	            }
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var self = this;
	            console.log(nextProps.listenInfo.data);
	            if (nextProps.listenInfo.data.timeStamp != undefined) {
	                var time = new Date();
	                if (time.valueOf() / 1000 - nextProps.listenInfo.data.timeStamp < 5) {
	                    (function () {
	                        var onBridgeReady = function onBridgeReady() {
	                            WeixinJSBridge.invoke('getBrandWCPayRequest', nextProps.listenInfo.data, function (res) {
	                                if (res.err_msg == "get_brand_wcpay_request:ok") {
	                                    console.log("支付成功！");
	                                    browserHistory.push('/question/' + self.state.curQuestionId);
	                                } else {
	                                    alert("支付失败，原因：" + JSON.stringify(res));
	                                }
	                                if (document.removeEventListener) {
	                                    document.removeEventListener('WeixinJSBridgeReady', onBridgeReady);
	                                } else if (document.attachEvent) {
	                                    document.detachEvent('WeixinJSBridgeReady', onBridgeReady);
	                                    document.detachEvent('onWeixinJSBridgeReady', onBridgeReady);
	                                }
	                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
	                            });
	                        };
	
	                        console.log("进入微信支付");
	
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
	                        // wx.chooseWXPay({
	                        //   timestamp:nextProps.listenInfo.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	                        //   nonceStr: nextProps.listenInfo.data.nonceStr, // 支付签名随机串，不长于 32 位
	                        //   package: nextProps.listenInfo.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
	                        //   signType: nextProps.listenInfo.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	                        //   paySign: nextProps.listenInfo.data.paySign, // 支付签名
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
	                    })();
	                } else if (nextProps.listenInfo.data.url != undefined) {
	                        // this.context.router.push(`question/${self.state.curQuestionId}`)
	                    }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var question = this.props.question;
	
	            return _react2.default.createElement('article', null);
	        }
	    }]);
	
	    return QuestionItemWithAvatar;
	}(_react.Component);
	
	exports.default = QuestionItemWithAvatar;

/***/ }

})
//# sourceMappingURL=0.192ec4a555824f1ea04c.hot-update.js.map