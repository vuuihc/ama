webpackHotUpdate(0,{101:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(1),s=r(c),i=n(6),f=n(5);n(165);var d=function(e){function t(e){return a(this,t),o(this,Object.getPrototypeOf(t).call(this,e))}return l(t,e),u(t,[{key:"render",value:function(){var e=this.props.question;return s["default"].createElement("article",{className:"question-item-asked-me"},s["default"].createElement("div",{className:"userInfo"},s["default"].createElement(i.Link,{to:f.baseUrl+"user/"+e.question_user_id},s["default"].createElement("img",{src:e.user_face}),s["default"].createElement("span",null,e.user_name))),s["default"].createElement(i.Link,{to:f.baseUrl+"answer/"+e.id},s["default"].createElement("div",{className:"question-content"},s["default"].createElement("h4",null,e.content)),s["default"].createElement("div",{className:"status"},"0"==e.isanswered?s["default"].createElement("div",{className:"btn not-solved"},"待解决"):s["default"].createElement("div",{className:"btn solved"},"已解决"))))}}]),t}(c.Component);t["default"]=d}});
//# sourceMappingURL=0.9519322996c62f256223.hot-update.js.map