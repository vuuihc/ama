import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory, useRouterHistory} from 'react-router'


import "../stylesheets/style.scss"

import App from './components/App'
import Hot from './components/Hot'
import Tutor from './components/Tutor'
import Account from './components/Account'
import ListenedList from './containers/lists/LitenedList'
import AskedMeList from './containers/lists/AskedMeList'
import IAskedList from './containers/lists/IAskedList'
import AccountEdit from './containers/AccountEdit'
import Question from './containers/Question'
import TutorIndex from './containers/TutorIndex'
import TutorShare from './containers/TutorShare'
import UserIndex from './containers/UserIndex'
// import UserShare from './containers/UserShare'
import Answer from './containers/pages/Answer'
import Search from "./components/Search"
import SearchTips from "./containers/SearchTips"
import SearchResult from "./containers/SearchResult"
import ResultList from "./containers/ResultList"
import Test from "./containers/Test"
import configureStore from './store/configureStore'
const store = configureStore();
import {baseUrl} from "./api/config"
ReactDom.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path = '/ama/7dyk/test' component={Test}/>
      <Route path={baseUrl} component={App}>
        <IndexRoute component={Hot}/>
        <Route path={baseUrl+"tutor"} component={Tutor}/>
        <Route path={baseUrl+"account"} component={Account}>
          <IndexRoute component={ListenedList}/>
          <Route path={baseUrl+"account/AskedMeList"} component={AskedMeList}/>
          <Route path={baseUrl+"account/IAskedList"} component={IAskedList}/>
        </Route>
        <Route path={baseUrl+"answer/:id" } component={Answer}/>
        <Route path={baseUrl+"edit"} component={AccountEdit}/>
        <Route path={baseUrl+"question/:id"} component={Question}/>
        <Route path={baseUrl + 'tutor'}>
          <Route path={baseUrl + 'tutor/:id'}  component={TutorIndex} />
          <Route path={baseUrl + 'tutor/share/:id'}  component={TutorShare} />
        </Route>
        <Route path={baseUrl+"user/:id"} component={UserIndex} />
        <Route path={baseUrl+"search"} component={Search}>
            <Route path={baseUrl+"search/result/:query"} component={SearchResult} />
            <Route path={baseUrl+"search/list/:type/:query"} component={ResultList} />
            <Route path={baseUrl+"search/tips"} component={SearchTips} />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
//
wx.onMenuShareAppMessage({
    title: '［7点问答］问师兄，问师姐，问前辈', // 分享标题
    desc: '大学生职场问答平台，对于即将到来的秋招，你的问题都可以在这里解决。', // 分享描述
    link: location.href, // 分享链接
    imgUrl: require("../images/logo.jpg"), // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        alert("分享成功")// 用户确认分享后执行的回调函数
    },
    cancel: function () {
        alert("分享失败")// 用户取消分享后执行的回调函数
    }
});
