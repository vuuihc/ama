/**
 * Created by zhushihao on 2016/6/24.
 */
import React, {Component, PropTypes} from 'react'
import {browserHistory, withRouter} from 'react-router'
import {baseUrl} from '../api/config'
import {connect} from 'react-redux'
import {editUserInfo} from '../actions/account';
import Alert from "../util/weui/alert"
import message from "../util/weui/message"
import '../../stylesheets/partials/modules/AccountEdit.scss'

class AccountEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.userInfo.user_company,
      job: this.props.userInfo.user_position,
      experience: this.props.userInfo.user_experience,
      introduction: this.props.userInfo.user_introduction,
      teacher_prize: this.props.userInfo.teacher_prize,
      showAlert:false,
      alertContent:"",
      alert:{
        title:"提示",
        buttons:[
          {
            type:"default",
            label:"确定",
            onClick:this.hideAlert.bind(this)
          }
        ]
      },
      canLeave:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.routerWillLeave = this.routerWillLeave.bind(this);
  }
  hideAlert(){
    this.setState({showAlert:false})
  }
  routerWillLeave(nextLocation) {
    // return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    const self = this
	if(nextLocation.state == 'okay'){
		return true;
	}
    const now = this.state;
    const previous = this.props.userInfo;
    if(!this.state.canLeave &&(now.company != previous.user_company || now.job != previous.user_position || now.introduction != previous.user_introduction)){
      self.setState({canLeave:true})
      message.confirm('您所编辑的页面尚未保存，确认离开?',"接着编辑","放弃修改",
        ()=>{
            self.setState({canLeave:false})
        },
        ()=>{
            browserHistory.push(nextLocation.pathname)
        }
      )
      return false
    }
  }
  componentDidMount() {
    // const {id} = this.props.params
    // this.props.dispatch((id))
    console.log("questionInfo===" + this.props.tutorInfo)
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
  }

  handleSubmit() {
    if(!(/^[1-9]+[0-9]*]*$/).test(this.state.teacher_prize)){
        this.setState({alertContent:'请在"提问价格"中填入整数',showAlert:true,teacher_prize:""})
        return
    }
    this.props.editUserInfo(this.state.company, this.state.job, this.state.experience, this.state.teacher_prize,this.state.introduction);
    browserHistory.push({pathname:baseUrl + "account/IAskedList", state:'okay'});
  }

  render() {
    const {userInfo} = this.props;
    return (
      <main className="user edit">
        <Alert show={this.state.showAlert} title="提示" buttons={this.state.alert.buttons}>{this.state.alertContent}</Alert>
        <div className="user-card-bg">
          <img src={userInfo.user_face.slice(0, -1) + '132'}/>
        </div>
        {userInfo.is_teacher==="1"?
            <div className="user-card">
              <img className="avatar" src={userInfo.user_face.slice(0, -1) + '132'}/>
              <h3 className="name">
                { userInfo.user_name }
              </h3>
              <div className="form-group">
                <label>姓名：</label>
                <input
                  placeholder="您的姓名"
                  value={this.state.name}
                  onChange={(e)=>{this.setState({name: e.target.value})}}
                />
              </div>
              <div className="form-group">
                <label>头衔/职位</label>
                <input
                  placeholder="某公司某职位"
                  value={this.state.company}
                  onChange={(e)=>{this.setState({company: e.target.value})}}
                />
              </div>
              <div className="form-group">
                <label>提问价格：</label>
                <input
                  type="number"
                  placeholder="输入您的提问价格"
                  value={this.state.teacher_prize}
                  onChange={(e)=>{this.setState({teacher_prize: e.target.value})}}
                />
              </div>
              <div className="form-group self-intro-text">
                <label>介绍一下自己（100字以内）： </label>
                <div className="count">{this.state.introduction.length} / 100</div>
                <textarea
                  placeholder="简单介绍一下自己，写一些自己的经历和擅长回答的问题"
                  value={this.state.introduction}
                  onChange={(e)=>{
                      if(e.target.value.length < 101 || e.target.value.length - this.state.introduction.length < 0){
                        this.setState({introduction: e.target.value})
                      }
                    }}
                />
              </div>
            </div>
              :
              <div className="user-card">
                <img className="avatar" src={userInfo.user_face.slice(0, -1) + '132'}/>
                <h3 className="name">
                  { userInfo.user_name }
                </h3>
                <div className="form-group">
                  <label>学校/年级：</label>
                  <input
                    placeholder="某学校大（研）*学生"
                    value={this.state.job}
                    onChange={(e)=>{this.setState({company: e.target.value})}}
                  />
                </div>
                <div className="form-group">
                  <label>头衔/职位：</label>
                  <input
                    placeholder="某公司某职位"
                    value={this.state.company}
                    onChange={(e)=>{this.setState({job: e.target.value})}}
                  />
                </div>
                <div className="form-group self-intro-text">
                  <label>介绍一下自己（100字以内）：</label>
                  <div className="count">{this.state.introduction.length} / 100</div>
                  <textarea
                    placeholder="写一些关于自己的情况和需求，让导师可以更好的帮助你解决问题"
                    value={this.state.introduction}
                    onChange={(e)=>{
                        if(e.target.value.length < 101 || e.target.value.length - this.state.introduction.length < 0){
                          this.setState({introduction: e.target.value})
                        }
                      }}
                  />
                </div>
            </div>
            }
          <a className="bottom-btn" onClick={this.handleSubmit}>完成</a>
      </main>
    )
  }
}
AccountEdit = withRouter(AccountEdit)

function mapStateToProps(state) {
  return {
    userInfo: state.account.userInfo
  }
}

export default connect(
  mapStateToProps, {editUserInfo}
)(AccountEdit)
