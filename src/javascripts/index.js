import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory,browserHistory, IndexRoute } from 'react-router'
import configureStore from './store/configureStore'

import "../stylesheets/style.scss"

import App from './components/App'
import Hot from './components/Hot'
import Tutor from './components/Tutor'
import Account from './components/Account'
import AccountEdit from './containers/AccountEdit'
import Question from './containers/Question'
import TutorIndex from './containers/TutorIndex'
import UserIndex from './containers/UserIndex'
import UserShare from './containers/UserShare'
import Answer from './containers/pages/Answer'

const store = configureStore();

ReactDom.render((
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Hot}/>
                    <Route path="hot" component={Hot}/>
                    <Route path="tutor" component={Tutor}/>
                    <Route path="account" >
                        <IndexRoute component={Account}/>
                        <Route path="answer/:id" component = {Answer}/>
                        <Route path="edit" component = {AccountEdit}/>
                    </Route>
                    <Route path="question/:id" component={Question} />
                    <Route path="tutor/:id" component={TutorIndex} />
                    <Route path="user" >
                      <IndexRoute component={UserIndex} />
                      <Route path="share" component={UserShare} />
                    </Route>
                </Route>
            </Router>
        </Provider>
),document.getElementById('root'));


