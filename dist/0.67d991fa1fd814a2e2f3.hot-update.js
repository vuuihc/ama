webpackHotUpdate(0,{

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(18);
	
	var _reactRedux = __webpack_require__(23);
	
	var _question = __webpack_require__(117);
	
	var _config = __webpack_require__(197);
	
	var _Loading = __webpack_require__(73);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _toast = __webpack_require__(90);
	
	var _toast2 = _interopRequireDefault(_toast);
	
	var _config2 = __webpack_require__(16);
	
	var _QuestionItemWithAvatar = __webpack_require__(199);
	
	var _QuestionItemWithAvatar2 = _interopRequireDefault(_QuestionItemWithAvatar);
	
	__webpack_require__(609);
	
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
	      curPage: 1
	    };
	    _this.handleScroll = _this.handleScroll.bind(_this);
	    return _this;
	  }
	
	  _createClass(HotQuestionList, [{
	    key: 'handleScroll',
	    value: function handleScroll() {
	      if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.hotQuestionList.completed) {
	        var curPage = ++this.state.curPage;
	        this.setState({ curPage: curPage });
	        this.props.dispatch((0, _question.getHotQuestionList)(curPage, 10));
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.landPage == null) {
	        this.props.dispatch((0, _config.setLandPage)(location.href));
	      }
	      this.props.dispatch((0, _question.getHotQuestionList)(1, 10));
	      document.addEventListener('scroll', this.handleScroll);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      document.removeEventListener('scroll', this.handleScroll);
	      console.log(this.refs);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var hotQuestionList = _props.hotQuestionList;
	      var listenInfo = _props.listenInfo;
	
	      return _react2.default.createElement(
	        'main',
	        { className: 'hot-question-list' },
	        _react2.default.createElement(
	          _toast2.default,
	          { icon: 'loading', show: listenInfo.loading },
	          '正在请求……'
	        ),
	        hotQuestionList.data.map(function (question, index) {
	          return _react2.default.createElement(_QuestionItemWithAvatar2.default, { question: question, key: index });
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
	    listenInfo: state.listenInfo,
	    landPage: state.landPage
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(HotQuestionList);

/***/ }

})
//# sourceMappingURL=0.67d991fa1fd814a2e2f3.hot-update.js.map