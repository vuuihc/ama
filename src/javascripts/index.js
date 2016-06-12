import 'babel-polyfill'
import React from 'react'
import App from './components/App'
import Hot from './components/Hot'
import Tutor from './components/Tutor'
import Account from './components/Account'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import configureStore from './store/configureStore'

import '../stylesheets/style.scss'

const store = configureStore()

render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute path="hot" component={Hot}/>
            <Route path="tutor" component={Tutor}/>
            <Route path="account" component={Account}/>
        </Route>
      </Router>
    </Provider>  ,
    document.getElementById('root')
)
