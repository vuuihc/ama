/**
 * Created by zhushihao on 2016/6/24.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

import '../../stylesheets/partials/modules/AccountEdit.scss'

class AccountEdit extends Component{
  componentDidMount(){
    // const {id} = this.props.params
    // this.props.dispatch((id))
    console.log("questionInfo==="+this.props.tutorInfo)
  }
  render() {
    const { tutorInfo } = this.props
    return (
      <main className="user edit" >
        <div className="user-card-bg">
          <img src="https://img.acg.moe/common/7/70/%E7%AB%A0%E9%B1%BC%E7%8C%AB.png" />
        </div>
        <div className="user-card">
          <img className="avatar" src="https://img.acg.moe/common/7/70/%E7%AB%A0%E9%B1%BC%E7%8C%AB.png" />
          <h3 className="name">
            韩东君
          </h3>
          <div className="form-group">
            <label>工作单位：</label>
            <input placeholder="输入您所在的公司"/>
          </div>
          <div className="form-group">
            <label>职      业：</label>
            <input placeholder="输入您的职业类型"/>
          </div>
          <div className="form-group">
            <label>经      验：</label>
            <input placeholder="输入您的工作时间"/>
          </div>
          <div className="form-group self-intro-text">
            <label>您的介绍：</label>
            <textarea placeholder="写点什么让大家更了解你吧~"/>
          </div>
          <a className="bottom-btn">完成</a>
        </div>
      </main>
    )
  }
}

AccountEdit.propTypes = {
  // tutorInfo: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

function mapStateToProps(state) {
  return {
    // tutorInfo: state.tutorInfo
  }
}

export default connect(
  mapStateToProps
)(AccountEdit)