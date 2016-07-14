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
// import TutorShare from './containers/TutorShare'
import UserIndex from './containers/UserIndex'
import UserShare from './containers/UserShare'
import Answer from './containers/pages/Answer'

import configureStore from './store/configureStore'
const store = configureStore();
import {baseUrl} from "./api/config"

ReactDom.render((
  <Provider store={store}>
    <Router history={browserHistory}>
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
        <Route path={baseUrl+"user/:id"} component={UserIndex}>
          {/*
           <IndexRoute component={UserIndex} />
           <Route path="share" component={UserShare} />
           */}
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));


