/**
 * Created by zhushihao on 2016/6/18.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { getOtherUserInfo } from '../actions/account'
import '../../stylesheets/partials/modules/UserIndex.scss'

class UserIndex extends Component{
  componentWillMount(){
    this.props.getOtherUserInfo(this.props.params.id);
  }
  componentDidMount(){
    // const {id} = this.props.params
    // this.props.dispatch(getTutorInfo(id))
    console.log("questionInfo==="+this.props.tutorInfo)
  }
  render() {
    const { user } = this.props
    return (
      <main className="user" >
        <div className="user-card-bg">
          <img src={user.user_face} />
        </div>
          <div className="user-card">
            <img className="avatar" src={user.user_face} />
            <h3 className="name">
              {user.user_name}
            </h3>
            <h4 className="title">
              {user.user_company} {user.user_position} {user.user_experience}
            </h4>
            <div className="self-intro">
              {user.user_introduction}
            </div>
          </div>
      </main>
    )
  }
}

UserIndex.propTypes = {
  tutorInfo: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.otherUserInfo
  }
}

export default connect(
  mapStateToProps, 
  {
    getOtherUserInfo
  }
)(UserIndex)