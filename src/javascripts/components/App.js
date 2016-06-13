/**
 * create by wuwq 
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../stylesheets/partials/modules/App.scss';

class App extends Component {
    render() {
        return(
            <div>
                { this.props.children }
                <div className="footer">
                    <ul>
                        <li><Link activeClassName='active' to="/hot">热点</Link></li>
                        <li><Link activeClassName='active' to="/tutor">导师</Link></li>
                        <li><Link activeClassName='active' to="/account">我的</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default App;