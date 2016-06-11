/**
 * create by wuwq 
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../stylesheets/partials/App.scss';

class App extends Component {
    render() {
        return(
            <div>
                { this.props.children }
                <div className="footer">
                    <Link to="hot">热点</Link>
                    <Link to="tutor">导师</Link>
                    <Link to="mine">我的</Link>
                </div>
            </div>
        )
    }
}
export default App;