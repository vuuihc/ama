/**
 * Created by zhushihao on 2016/6/14.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getTutorList} from '../actions/tutor.js'
import { getUserInfo } from '../actions/account'

import '../../stylesheets/partials/modules/TutorList.scss'
import Loading from "./Loading2"
import {baseUrl} from "../api/config"
class TutorList extends Component {
  constructor(props){
    super(props)
    this.state = {
      curPage:1,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(getTutorList(1, 20))
    this.props.dispatch(getUserInfo());
    console.log("tutorList===" + this.props.tutorList)
    $('.app-container').on('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    $('.app-container').off('scroll', this.handleScroll);
  }
  handleScroll() {
    let container = document.getElementsByClassName('app-container')[0];   
    console.log(container.clientHeight, '+', container.scrollTop, '=', container.clientHeight + container.scrollTop, container.scrollHeight);  
    if (container.clientHeight + container.scrollTop + 1 == container.scrollHeight  && !this.props.hotQuestionList.completed) {
      const curPage = ++this.state.curPage;
      this.setState({curPage});
      this.props.dispatch(getTutorList(curPage, 10))
    }
  }

  render() {
    const {tutorList, userId} = this.props
    return (
      <main className="tutor-list">
        {
          tutorList.data.map((tutor, index) =>
            <Link key={index} to={tutor.user_id == userId ? `${baseUrl}account` : `${baseUrl}tutor/${tutor.user_id}` }>
              <article>
                <div className="tutor-info">
                  <img src={tutor.user_face.slice(0, -1) + '64'}/>
                  <div className="tutor-intro">
                    <h3 >{tutor.user_name}</h3>
                    <h4>
                      <span>{tutor.user_title}</span>
                    </h4>
                  </div>
                </div>
                <div className="answer-info">
                  {tutor.answer_number}个回答
                </div>
              </article>
            </Link>
          )
        }
        <Loading completed = { tutorList.completed } />
      </main>
    )
  }
}

TutorList.propTypes = {
  tutorList: PropTypes.shape({}).isRequired,
}

function mapStateToProps(state) {
  return {
    tutorList: state.tutorList,
    userId: state.account.userInfo.user_id
  }
}

export default connect(
  mapStateToProps
)(TutorList)
