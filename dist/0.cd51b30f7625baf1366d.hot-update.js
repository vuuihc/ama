webpackHotUpdate(0,{

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/*蓝色*/\n/*红色*/\n/*橙色*/\n/*黑*/\n/*白*/\n/*高度和大小*/\n.accountAnswer {\n  min-height: 100vh;\n  background: #fafafa;\n  padding-top: 0.58667rem; }\n  .accountAnswer .question {\n    background: white;\n    border-top: 1px solid #dddddd;\n    border-bottom: 1px solid #dddddd;\n    height: 4.52rem; }\n    .accountAnswer .question .head {\n      margin-top: 0.32rem;\n      height: 1.6rem;\n      line-height: 1.6rem; }\n      .accountAnswer .question .head img {\n        width: 1.6rem;\n        height: 1.6rem;\n        -webkit-border-radius: 1.6rem;\n        -moz-border-radius: 1.6rem;\n        border-radius: 1.6rem;\n        margin-left: 0.32rem;\n        float: left; }\n      .accountAnswer .question .head .name {\n        color: #202020;\n        margin-left: 0.32rem;\n        font-size: 0.46667rem;\n        float: left; }\n      .accountAnswer .question .head .price {\n        color: #ff0000;\n        font-size: 0.4rem;\n        margin-right: 0.32rem;\n        float: right; }\n    .accountAnswer .question .stem {\n      padding: 0 0.52rem;\n      padding-top: 0.61333rem;\n      color: #202020; }\n    .accountAnswer .question .time {\n      margin-bottom: 0.26667rem;\n      color: #535353;\n      font-size: 0.28rem;\n      padding-right: 0.32rem;\n      text-align: right; }\n  .accountAnswer .hint {\n    margin-top: 0.30667rem;\n    font-size: 0.28rem;\n    color: #989898;\n    text-align: center; }\n  .accountAnswer .replyHint {\n    color: #202020;\n    margin-top: 0.98667rem;\n    text-align: center; }\n  .accountAnswer .replyContainer {\n    position: relative;\n    height: 3.21333rem;\n    line-height: 3.21333rem;\n    text-align: center; }\n    .accountAnswer .replyContainer.on .replyIcon {\n      opacity: 0.29; }\n    .accountAnswer .replyContainer.on .recording {\n      display: block; }\n    .accountAnswer .replyContainer .replyIcon {\n      display: inline-block;\n      -webkit-border-radius: 1.2rem;\n      -moz-border-radius: 1.2rem;\n      border-radius: 1.2rem;\n      width: 2.4rem;\n      height: 2.4rem;\n      background: #0387e7 url(" + __webpack_require__(609) + ") 50% 50% no-repeat;\n      background-size: 50%;\n      vertical-align: middle; }\n    .accountAnswer .replyContainer .recording {\n      position: absolute;\n      background: url(" + __webpack_require__(613) + ") 50% 50% no-repeat;\n      background-size: 6.98667rem;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      display: none; }\n  .accountAnswer .voiceContainer {\n    position: relative;\n    height: 3.21333rem;\n    line-height: 3.21333rem;\n    text-align: center; }\n    .accountAnswer .voiceContainer .bubble-voice {\n      display: inline-block;\n      -webkit-border-radius: 1.2rem;\n      -moz-border-radius: 1.2rem;\n      border-radius: 1.2rem;\n      width: 2.4rem;\n      height: 2.4rem;\n      background: #0387e7 url(" + __webpack_require__(265) + ") 50% 50% no-repeat;\n      background-size: 50%;\n      vertical-align: middle; }\n  .accountAnswer .reRecord {\n    color: #ffffff;\n    margin: 0 auto;\n    margin-top: 0.02667rem;\n    text-align: center;\n    background: #da2726;\n    width: 1.01333rem;\n    height: 1.01333rem;\n    -webkit-border-radius: 0.50667rem;\n    -moz-border-radius: 0.50667rem;\n    border-radius: 0.50667rem;\n    line-height: 1.01333rem; }\n\n@-webkit-keyframes anLoca {\n  from {\n    -webkit-transform: scale(1, 1); }\n  to {\n    -webkit-transform: scale(2, 2); } }\n  .accountAnswer .recordHint {\n    margin-top: 0.68rem;\n    text-align: center;\n    color: #989898; }\n  .accountAnswer .sendBtn {\n    background: #ff9b30;\n    width: 9.34667rem;\n    color: #ffffff;\n    height: 1.22667rem;\n    line-height: 1.22667rem;\n    -webkit-border-radius: 5px;\n    -moz-border-radius: 5px;\n    border-radius: 5px;\n    border: 1px solid #e88720;\n    text-align: center;\n    margin: 0 auto;\n    margin-top: 0.28rem; }\n  .accountAnswer .anLocaApply:hover {\n    text-align: center;\n    -webkit-animation: anLoca 0.8s;\n    -webkit-animation-iteration-count: 1;\n    -webkit-animation-direction: alternate; }\n", ""]);
	
	// exports


/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(16);
	
	var _reactRedux = __webpack_require__(22);
	
	var _question = __webpack_require__(114);
	
	var _Loading = __webpack_require__(80);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	__webpack_require__(594);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zsh on 2016/3/11.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var HotQuestionList = function (_Component) {
	  _inherits(HotQuestionList, _Component);
	
	  function HotQuestionList(props) {
	    _classCallCheck(this, HotQuestionList);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HotQuestionList).call(this, props));
	
	    _this.state = {
	      curAudio: "",
	      curPage: 1,
	      curQuestionId: null
	    };
	    return _this;
	  }
	
	  _createClass(HotQuestionList, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.props.dispatch((0, _question.getHotQuestionList)(1, 10));
	      function onScroll(e) {
	        console.log(window.scrollY);
	        console.log(window.innerHeight);
	        console.log(document.body.clientHeight);
	
	        if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.hotQuestionList.completed) {
	          var curPage = ++this.state.curPage;
	          this.setState({ curPage: curPage });
	          this.props.dispatch((0, _question.getHotQuestionList)(curPage, 10));
	        }
	      }
	      document.addEventListener('scroll', onScroll.bind(this));
	    }
	  }, {
	    key: 'getPrepayInfo',
	    value: function getPrepayInfo(answerId) {
	      this.setState({ curQuestionId: answerId });
	      this.props.dispatch((0, _question.getListenInfo)(answerId));
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var self = this;
	      console.log(nextProps.listenInfo.data);
	      if (nextProps.listenInfo.data.timeStamp != undefined) {
	        var time = new Date();
	        if (time.valueOf() / 1000 - nextProps.listenInfo.data.timeStamp < 5) {
	          console.log("进入微信支付");
	          wx.chooseWXPay({
	            timestamp: nextProps.listenInfo.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	            nonceStr: nextProps.listenInfo.data.nonceStr, // 支付签名随机串，不长于 32 位
	            package: nextProps.listenInfo.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
	            signType: nextProps.listenInfo.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	            paySign: nextProps.listenInfo.data.paySign, // 支付签名
	            success: function success(res) {
	              console.log("支付成功！");
	              self.context.router.push('question/' + self.state.curQuestionId);
	            },
	            fail: function fail(res) {
	              alert("支付失败");
	              console.log("失败原因：");
	              console.log(res);
	            }
	          });
	        } else if (nextProps.listenInfo.data.audio != undefined) {
	          this.context.router.push('question/' + self.state.curQuestionId);
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var hotQuestionList = this.props.hotQuestionList;
	
	      return _react2.default.createElement(
	        'main',
	        { className: 'hot-question-list' },
	        hotQuestionList.data.map(function (question, index) {
	          return _react2.default.createElement(
	            'article',
	            { key: index },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: "question/" + question.question_id },
	              _react2.default.createElement(
	                'div',
	                { className: 'question-content' },
	                _react2.default.createElement(
	                  'h4',
	                  null,
	                  question.question_content
	                )
	              )
	            ),
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: "tutor/" + question.teacher_id },
	              _react2.default.createElement(
	                'div',
	                { className: 'mentor' },
	                _react2.default.createElement('img', { src: question.teacher_face }),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'mentor-info' },
	                  _react2.default.createElement(
	                    'span',
	                    { className: 'name' },
	                    question.teacher_name
	                  ),
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    question.user_title
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'answer' },
	              _react2.default.createElement(
	                'span',
	                { className: 'bubble', onClick: _this2.getPrepayInfo.bind(_this2, question.question_id) },
	                _react2.default.createElement('span', { className: 'bubble-tail' }),
	                _react2.default.createElement('span', { className: 'bubble-voice' }),
	                _react2.default.createElement(
	                  'span',
	                  { className: 'bubble-text' },
	                  '1元偷偷听'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'remark' },
	              _react2.default.createElement(
	                'div',
	                { className: 'value' },
	                '价值￥',
	                question.question_prize
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'remark-info' },
	                _react2.default.createElement(
	                  'span',
	                  null,
	                  question.answer_listen,
	                  '人偷听'
	                ),
	                _react2.default.createElement(
	                  'span',
	                  { className: 'kui' },
	                  question.answer_dislike,
	                  '人觉得亏了'
	                )
	              )
	            )
	          );
	        }),
	        !hotQuestionList.completed && _react2.default.createElement(_Loading2.default, null)
	      );
	    }
	  }]);
	
	  return HotQuestionList;
	}(_react.Component);
	
	HotQuestionList.propTypes = {
	  hotQuestionList: _react.PropTypes.shape({}).isRequired,
	  listenInfo: _react.PropTypes.shape({
	    data: _react.PropTypes.shape({}).isRequired
	  }).isRequired
	};
	HotQuestionList.contextTypes = {
	  router: _react.PropTypes.object
	};
	function mapStateToProps(state) {
	  return {
	    hotQuestionList: state.hotQuestionList,
	    listenInfo: state.listenInfo
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(HotQuestionList);

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(16);
	
	var _reactRedux = __webpack_require__(22);
	
	var _question = __webpack_require__(114);
	
	var _VoiceWave = __webpack_require__(274);
	
	var _VoiceWave2 = _interopRequireDefault(_VoiceWave);
	
	__webpack_require__(598);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by zhushihao on 2016/6/14.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var Question = function (_Component) {
	  _inherits(Question, _Component);
	
	  function Question(props) {
	    _classCallCheck(this, Question);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Question).call(this, props));
	
	    _this.state = {
	      playing: false,
	      answerAudio: null
	    };
	    return _this;
	  }
	
	  _createClass(Question, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var id = this.props.params.id;
	
	      this.props.dispatch((0, _question.getQuestionInfo)(id));
	      console.log("questionInfo===" + this.props.questionInfo);
	    }
	  }, {
	    key: 'getPrepayInfo',
	    value: function getPrepayInfo(answerId) {
	      this.props.dispatch((0, _question.getListenInfo)(answerId));
	    }
	  }, {
	    key: 'bubbleClick',
	    value: function bubbleClick() {
	      console.log("this.state.answerAudio");
	      console.log(this.state.answerAudio);
	      if (this.state.answerAudio != null) {
	        this.playAudio();
	      } else {
	        var answerId = this.props.params.id;
	        this.getPrepayInfo(answerId);
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var self = this;
	      var answerId = this.props.params.id;
	      if (nextProps.listenInfo.data.timeStamp != undefined) {
	        var time = new Date();
	        if (time.valueOf() / 1000 - nextProps.listenInfo.data.timeStamp < 5) {
	          console.log("进入微信支付");
	          wx.chooseWXPay({
	            timestamp: nextProps.listenInfo.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	            nonceStr: nextProps.listenInfo.data.nonceStr, // 支付签名随机串，不长于 32 位
	            package: nextProps.listenInfo.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
	            signType: nextProps.listenInfo.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	            paySign: nextProps.listenInfo.data.paySign, // 支付签名
	            success: function success(res) {
	              console.log("支付成功！");
	              self.props.dispatch((0, _question.getListenInfo)(answerId));
	            },
	            fail: function fail(res) {
	              alert("支付失败");
	              console.log("失败原因：");
	              console.log(res);
	            }
	          });
	        } else if (nextProps.listenInfo.data.audio != undefined) {
	          console.log("nextProps.listenInfo.data");
	          console.log(nextProps.listenInfo.data);
	          var answerAudio = new Audio(nextProps.listenInfo.data.audio);
	          this.setState({ answerAudio: answerAudio });
	        }
	      }
	    }
	  }, {
	    key: 'playAudio',
	    value: function playAudio() {
	      console.log("into playAudio");
	      var audio = this.state.answerAudio;
	      if (window.WeixinJSBridge) {
	        wx.getNetworkType({
	          success: function success(res) {
	            audio.play();
	          },
	          fail: function fail(res) {
	            audio.play();
	          }
	        });
	      } else {
	        document.addEventListener("WeixinJSBridgeReady", function () {
	          wx.getNetworkType({
	            success: function success(res) {
	              audio.play();
	            },
	            fail: function fail(res) {
	              audio.play();
	            }
	          });
	        }, false);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var questionInfo = _props.questionInfo;
	      var listenInfo = _props.listenInfo;
	
	      return _react2.default.createElement(
	        'main',
	        { className: 'question' },
	        _react2.default.createElement(
	          'div',
	          { className: 'question-content' },
	          questionInfo.question_content
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'tutor' },
	          _react2.default.createElement('img', { src: questionInfo.teacher_face }),
	          _react2.default.createElement(
	            'h3',
	            null,
	            questionInfo.teacher_name
	          ),
	          _react2.default.createElement(
	            'h4',
	            null,
	            questionInfo.teacher_company + "　" + questionInfo.teacher_position,
	            '  '
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'answer', onClick: this.bubbleClick.bind(this) },
	          _react2.default.createElement(
	            'span',
	            { className: 'bubble' },
	            _react2.default.createElement('span', { className: 'bubble-tail' }),
	            this.state.playing ? _react2.default.createElement(_VoiceWave2.default, null) : _react2.default.createElement('span', { className: 'bubble-voice' }),
	            _react2.default.createElement(
	              'span',
	              { className: 'bubble-text' },
	              listenInfo.data.answer_audio ? "点击播放" : questionInfo.question_prize + '元偷偷听'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'remark' },
	          _react2.default.createElement(
	            'span',
	            null,
	            questionInfo.answer_listen,
	            '人偷听'
	          ),
	          _react2.default.createElement(
	            'span',
	            { className: 'kui' },
	            questionInfo.answer_dislike,
	            '人觉得亏了'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'ask' },
	          _react2.default.createElement(
	            'div',
	            { className: 'value' },
	            '￥',
	            questionInfo.teacher_prize
	          ),
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { className: 'bottom-btn', to: "tutor/" + questionInfo.teacher_id },
	            '向TA提问'
	          )
	        )
	      );
	    }
	  }]);
	
	  return Question;
	}(_react.Component);
	
	Question.propTypes = {
	  questionInfo: _react.PropTypes.shape({}).isRequired,
	  listenInfo: _react.PropTypes.shape({}).isRequired
	};
	
	function mapStateToProps(state) {
	  return {
	    questionInfo: state.questionInfo,
	    listenInfo: state.listenInfo
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Question);

/***/ },

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(16);
	
	var _reactRedux = __webpack_require__(22);
	
	__webpack_require__(591);
	
	var _question = __webpack_require__(114);
	
	var _time = __webpack_require__(297);
	
	var _time2 = _interopRequireDefault(_time);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Answer = function (_Component) {
	  _inherits(Answer, _Component);
	
	  function Answer() {
	    _classCallCheck(this, Answer);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Answer).call(this));
	
	    _this.state = {
	      localId: null,
	      playing: false,
	      recording: false
	    };
	    return _this;
	  }
	
	  _createClass(Answer, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var id = this.props.params.id;
	
	      this.props.getQuestionInfo(id);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      console.log(this.props.questionInfo);
	      var talkBtn = document.querySelector(".replyContainer");
	      var localId, START, END, recordTimer;
	      var self = this;
	
	      var recordStartHandler = function recordStartHandler(event) {
	        event.preventDefault();
	        START = new Date().getTime();
	        talkBtn.classList.add('on');
	        recordTimer = setTimeout(function () {
	          wx.startRecord({
	            success: function success() {
	              localStorage.rainAllowRecord = 'true';
	            },
	            cancel: function cancel() {
	              alert('用户拒绝授权录音');
	            }
	          });
	        }, 300);
	      };
	      var recordStopHandler = function recordStopHandler(event) {
	        event.preventDefault();
	        END = new Date().getTime();
	        talkBtn.classList.remove('on');
	        if (END - START < 300) {
	          END = 0;
	          START = 0;
	          console.log("录音时间" + (END - START));
	          //小于300ms，不录音
	          clearTimeout(recordTimer);
	        } else {
	          console.log("录音时间" + (END - START));
	          wx.stopRecord({
	            success: function success(res) {
	              localId = res.localId;
	              self.setState({ localId: localId });
	            },
	            fail: function fail(res) {
	              alert(JSON.stringify(res));
	            }
	          });
	        }
	      };
	      var clickHandler = function clickHandler(event) {
	        if (self.state.recording) {
	          recordStopHandler(event);
	          self.setState({ recording: false });
	        } else {
	          recordStartHandler(event);
	          self.setState({ recording: true });
	        }
	      };
	      talkBtn.addEventListener('click', clickHandler);
	
	      wx.onVoicePlayEnd({
	        success: function success(res) {
	          self.setState({ playing: false });
	        }
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // if(nextProps.saveVoiceInfo.data.url!=undefined){
	      //   alert("保存成功，感谢您的回答")
	      // }
	    }
	  }, {
	    key: 'confirmAnswer',
	    value: function confirmAnswer() {
	      var self = this;
	      var localId = this.state.localId;
	      if (localId == null) {
	        alert("请先录音哦");
	        return;
	      }
	      wx.uploadVoice({
	        localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
	        isShowProgressTips: 1, // 默认为1，显示进度提示
	        success: function success(res) {
	          console.log("上传成功了！");
	          console.log("serverId is ===" + res.serverId);
	          var serverId = res.serverId;
	          var questionId = self.props.params.id;
	          self.props.dispatch((0, _question.saveVoice)(serverId, questionId));
	        }
	      });
	    }
	  }, {
	    key: 'playVoice',
	    value: function playVoice() {
	      wx.playVoice({
	        localId: this.state.localId // 需要播放的音频的本地ID，由stopRecord接口获得
	      });
	      this.setState({ playing: true });
	    }
	  }, {
	    key: 'reRecord',
	    value: function reRecord() {
	      this.setState({ localId: null, serverId: null });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var questionInfo = this.props.questionInfo;
	      var replyContainer = _react2.default.createElement(
	        'div',
	        { className: 'replyContainer' },
	        _react2.default.createElement('div', { className: 'replyIcon' }),
	        _react2.default.createElement('div', { className: 'recording' })
	      );
	      var voiceContainer = _react2.default.createElement(
	        'div',
	        { className: 'voiceContainer', onClick: this.playVoice.bind(this) },
	        this.state.playing ? _react2.default.createElement(VoiceWave, null) : _react2.default.createElement('span', { className: 'bubble-voice' })
	      );
	      return _react2.default.createElement(
	        'div',
	        { className: 'accountAnswer' },
	        _react2.default.createElement(
	          'div',
	          { className: 'question' },
	          _react2.default.createElement(
	            'div',
	            { className: 'head' },
	            _react2.default.createElement(
	              _reactRouter.Link,
	              { to: 'user/' + questionInfo.user_id },
	              _react2.default.createElement('img', { src: questionInfo.user_face })
	            ),
	            _react2.default.createElement(
	              'span',
	              { className: 'name' },
	              questionInfo.user_name
	            ),
	            _react2.default.createElement(
	              'span',
	              { className: 'price' },
	              '￥ ',
	              questionInfo.question_prize
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'stem' },
	            questionInfo.question_content
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'time' },
	            _time2.default.getTimeSpan(questionInfo.question_time),
	            '之前'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'hint' },
	          '您的回答将被公开，答案每被偷听一次，你就赚 ￥0.3'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'replyHint' },
	          this.state.localId == null ? "点击录音" : "点击试听"
	        ),
	        this.state.localId == null ? replyContainer : voiceContainer,
	        _react2.default.createElement(
	          'div',
	          { className: 'reRecord', onClick: this.reRecord.bind(this) },
	          '重录'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'recordHint' },
	          this.state.localId == null ? "点击录音按钮最多可录制120S" : "点击试听可试听您最近一次的回答"
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'sendBtn', onClick: this.confirmAnswer.bind(this) },
	          '发送'
	        )
	      );
	    }
	  }]);
	
	  return Answer;
	}(_react.Component);
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    questionInfo: state.questionInfo,
	    saveVoiceInfo: state.saveVoiceInfo
	  };
	};
	
	Answer = (0, _reactRedux.connect)(mapStateToProps, { getQuestionInfo: _question.getQuestionInfo })(Answer);
	
	exports.default = Answer;

/***/ }

})
//# sourceMappingURL=0.cd51b30f7625baf1366d.hot-update.js.map