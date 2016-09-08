/**
 * Created by zhushihao on 2016/6/14.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getTutorList} from '../actions/tutor.js'
import { getUserInfo } from '../actions/account'
import TutorItem from "./blocks/TutorItem"
import SearchBar from "./SearchBar"

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
    $('.app-container').on('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    $('.app-container').off('scroll', this.handleScroll);
  }
  handleScroll() {
    let container = document.getElementsByClassName('app-container')[0];
    if (container.clientHeight + container.scrollTop + 1 >= container.scrollHeight  && !this.props.tutorList.completed) {
      const curPage = ++this.state.curPage;
      this.setState({curPage});
      this.props.dispatch(getTutorList(curPage, 10))
    }
  }

  render() {
    const {tutorList, userId} = this.props
    return (
      <main className="tutor-list">
        <SearchBar />
        {
          tutorList.data.map((tutor, index) =>
            <TutorItem userId={userId} tutor={tutor} key={index}/>
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
