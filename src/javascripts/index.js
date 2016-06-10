import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import configureStore from './store/configureStore'

import Index from './components/Index.js'


//import '../../css/mobile/styles.scss'

const store = configureStore()

render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" >
          <IndexRoute component={Index} />
        </Route>
      </Router>
    </Provider>  ,
    document.getElementById('root')
)
