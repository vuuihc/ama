/**
 * create by wuwq
 */
import React, {Component} from 'react';
import '../../stylesheets/partials/modules/Account.scss';
import LitenedList from '../containers/lists/LitenedList';
import IAskedList from '../containers/lists/IAskedList';
import AskedMeList from '../containers/lists/AskedMeList';

class Account extends Component {
  constructor() {
    super();
    this.state = {
      //index
      index: 1,
      listenedData: [],
      iAskedData: [],
      askedMeData: []
    }
  }

  handleClick(value, event) {
    this.setState({index: value});
  }

  render() {
    return (
      <div id="accountIndex">
        <Link to="account/edit" >
          <img className="editEntry" src={require("../../images/EditEntry.png")}/>
        </Link>
        <div className="head">
          <div className="headOuter">
            <img src={require("../../images/head.jpg")}/>
          </div>
        </div>
        <div className="name">倪龙云</div>
        <div className="position">浩瀚科技 CEO</div>
        <div className="description">欢迎咨询有关创业、投资、互联网等方面问题</div>
        <div className="divider top"></div>
        <div className="statics">
          <ul>
            <li>23题</li>
            <li>3000次</li>
            <li>￥293848</li>
          </ul>
          <ul>
            <li>回答过</li>
            <li>被偷听</li>
            <li>身价</li>
          </ul>
        </div>
        <div className="dividerWide"></div>
        <div className="nav">
          <ul>
            <li
              onClick={this.handleClick.bind(this, 1) }
              className={this.state.index == 1 ? 'active': ''}
            >听过的
            </li>
            <li
              onClick={this.handleClick.bind(this, 2) }
              className={this.state.index == 2 ? 'active': ''}
            >我问的
            </li>
            <li
              onClick={this.handleClick.bind(this, 3) }
              className={this.state.index == 3 ? 'active': ''}
            >问我的
            </li>
          </ul>
        </div>
        <div className="divider"></div>
        <div onDrag={(()=>{console.log(111)})()}>
          {
            (()=> {
              switch (this.state.index) {
                case 1:
                  return <LitenedList listenedData={this.state.listenedData}/>;
                  break;
                case 2:
                  return <IAskedList iAskedData={this.state.iAskedData}/>;
                  break;
                case 3:
                  return <AskedMeList askedMeData={this.state.askedMeData}/>;
                  break;
                default:
                  return <LitenedList/>;
              }
            })()

          }
        </div>

      </div>
    )
  }
}
export default Account;