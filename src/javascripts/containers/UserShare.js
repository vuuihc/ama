/**
 * Created by zhushihao on 2016/6/24.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

import '../../stylesheets/partials/modules/UserShare.scss'

class UserShare extends Component{
  componentDidMount(){
    const {id} = this.props.params
    // this.props.dispatch(getTutorInfo(id))
    console.log("questionInfo==="+this.props.tutorInfo)
  }
  render() {
    const { tutorInfo } = this.props
    return (
      <main className="user share" >
        <div className="user-card-bg">
          <img src="https://img.acg.moe/common/7/70/%E7%AB%A0%E9%B1%BC%E7%8C%AB.png" />
        </div>
        <div className="user-card">
          <img className="avatar" src="https://img.acg.moe/common/7/70/%E7%AB%A0%E9%B1%BC%E7%8C%AB.png" />
          <h3 className="name">
            韩东君
          </h3>
          <h4 className="title">
            战略投资总监
          </h4>
          <div className="description">
            随时随地帮你解决找工作难题！
          </div>
          <img className="QRCode" src={require("../../images/qr.png")} />
          <div className="tip">
            截图分享到朋友圈<br/>
            帮助更多的学弟学妹解决困惑吧
          </div>
        </div>
      </main>
    )
  }
}

UserShare.propTypes = {
  // tutorInfo: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

function mapStateToProps(state) {
  return {
    // tutorInfo: state.tutorInfo
  }
}

export default connect(
  mapStateToProps
)(UserShare)