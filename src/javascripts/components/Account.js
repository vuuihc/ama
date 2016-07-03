/**
 * create by wuwq
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import '../../stylesheets/partials/modules/Account.scss';
import LitenedList from '../containers/lists/LitenedList';
import IAskedList from '../containers/lists/IAskedList';
import AskedMeList from '../containers/lists/AskedMeList';
import { connect } from  'react-redux';
import { getUserInfo, getListened, getAskedMe, getIAsked } from '../actions/account'

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    }
  }

  componentDidMount(){
      this.props.getUserInfo();
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
            <img src={this.props.userInfo.user_face}/>
          </div>
        </div>
        <div className="name">{this.props.userInfo.user_name}</div>
        <div className="position">{this.props.userInfo.user_title}</div>
        <div className="description">{this.props.userInfo.user_introduction}</div>
        <div className="divider top"></div>
        <div className="statics">
          <ul>
            <li>{this.props.userInfo.answer_num}题</li>
            <li>{this.props.userInfo.listen_num}次</li>
            <li>￥{this.props.userInfo.teacher_prize}</li>
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
          <div className="divider"></div>
        </div>
        <div>
          {
            (()=> {
              switch (this.state.index) {
                case 1:
                  return <LitenedList />;
                  break;
                case 2:
                  return <IAskedList />;
                  break;
                case 3:
                  return <AskedMeList />;
                  break;
                default:
                  return <LitenedList />;
              }
            })()
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
    return{
        userInfo: state.account.userInfo,
        listened: state.account.listened,
        iAsked: state.account.iAsked,
        askedMe: state.account.askedMe
    }
}

Account = connect(mapStateToProps, { getUserInfo })(Account);

export default Account;