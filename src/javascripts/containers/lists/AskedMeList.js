import React, {Component} from 'react';
import {Link} from 'react-router';
import '../../../stylesheets/partials/modules/AskedMeList.scss';
import Modal from '../Modal';
import {connect} from 'react-redux'
import QuestionItemAskedMe from '../blocks/QuestionItemAskedMe';
import {getAskedMe, requestBecomeTeacher} from '../../actions/account'
import Loading from '../Loading2'
import { baseUrl } from "../../api/config"
class AskedMeList extends Component {

  constructor() {
    super();
    this.state = {
      afford: '',
      inviteCode: '',
      isTeacher: true
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    if (this.props.data.length === 0) {
      this.props.getAskedMe(1, 10);
    }
    $('.app-container').on('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    $('.app-container').off('scroll', this.handleScroll);
  }
  handleSubmit() {
    if(!this.state.inviteCode || !this.state.afford){
        alert('还有空缺的项，请检查后继续填写');
        return;
    }
    this.props.requestBecomeTeacher(this.state.inviteCode, this.state.afford);
    this.refs.modal.close();
  }
  handleScroll() {
    const {completed, page, loading} = this.props;
    let container = document.getElementsByClassName('app-container')[0];
    console.log(container.clientHeight, '+', container.scrollTop, '=', container.clientHeight + container.scrollTop, container.scrollHeight);
    if (!loading && container.clientHeight + container.scrollTop + 1 >= container.scrollHeight  && !completed) {
      this.props.getAskedMe(page, 10);
    }
  }
    
  render() {
    const {userInfo, completed, data} = this.props;
    return (
      <div className="askedMeList">
        {
          userInfo.is_teacher === '1' ? (
          // this.state.isTeacher ? (
            (data.length === 0) && completed
              ? (
              <div>
                <div className="hint">
                  还没有人问你
                </div>
                <Link to={`${baseUrl}tutor/share/${userInfo.user_id}`}>
                    <button className="becomeTutor">
                        让更多人了解你
                    </button>
                </Link>
              </div>
            ) : (
              <div>
                {
                  data.map((item, index)=> {
                    return <QuestionItemAskedMe question={item} key={index} />;
                  })
                }
                {/*<div onClick={e=>{this.setState({isTeacher: !this.state.isTeacher});}}>切换</div>*/}
                {
                  <Loading completed = {completed} />
                }
              </div>
            )
          ) : (
            <div>
              <div className="hint">
                您还不是导师哦~
              </div>
              <div className="email">
                发送个人简历到renzheng@7dyk.com
              </div>
              <div className="next">
                审核通过后我们会以邮件的形式发放邀请码
              </div>
              <button className="becomeTutor" onClick={(e)=>{this.refs.modal.open()}}>
                成为导师
              </button>
              <Modal left="22" top="225" ref="modal">
                <div className="invitation">
                  <span>邀请码</span>
                  <input
                    type="text"
                    className="no-underline"
                    style={{width:`4rem`}}
                    value={this.state.inviteCode}
                    placeholder="请输入您的邀请码"
                    onChange={(e)=>{this.setState({inviteCode:e.target.value})}}
                  />
                </div>
                <div className="afford">
                  <span>向我提问需要支付</span>
                  <input
                    type="text"
                    style={{width:`1.2rem`}}
                    className="no-underline"
                    value={this.state.afford}
                    onChange={(e)=>{this.setState({afford:e.target.value})}}
                  />
                  <span>元</span>
                </div>
                <div className="submit" onClick={this.handleSubmit.bind(this)}>确定</div>
              </Modal>
              {/* */ }
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.account.askedMe.loading,
    data: state.account.askedMe.data,
    completed: state.account.askedMe.completed,
    userInfo: state.account.userInfo,
    page: state.account.askedMe.page
  }
}

AskedMeList = connect(mapStateToProps, {getAskedMe, requestBecomeTeacher})(AskedMeList);

export default AskedMeList;
