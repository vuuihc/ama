/**
 * create by wuwq
 */
import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import {connect} from 'react-redux';
import '../../stylesheets/partials/modules/App.scss';
import {baseUrl} from "../api/config"
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="app-container" ref="content">{ this.props.children }</div>
        <div className="footer">
          <ul>
            <li><IndexLink activeClassName='active' to={baseUrl}>热点</IndexLink></li>
            <li><Link activeClassName='active' to={baseUrl+"tutor"}>导师</Link></li>
            <li><Link activeClassName='active' to={baseUrl+"account"}>我的</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}
App = connect()(App);
export default App;