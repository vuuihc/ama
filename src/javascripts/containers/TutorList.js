/**
 * Created by zhushihao on 2016/6/14.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getTutorList} from '../actions/tutor.js'

import '../../stylesheets/partials/modules/TutorList.scss'
import Loading from "./Loading"
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
    this.props.dispatch(getTutorList(1, 10))
    console.log("tutorList===" + this.props.tutorList)
    document.addEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.tutorList.completed) {
      const curPage = ++this.state.curPage;
      this.setState({curPage});
      this.props.dispatch(getTutorList(curPage, 10))
    }
  }

  render() {
    const {tutorList} = this.props
    return (
      <main className="tutor-list">
        {
          tutorList.data.map((tutor, index) =>
            <Link key={index} to={baseUrl+"tutor/"+tutor.user_id}>
              <article>
                <div className="tutor-info">
                  <img src={tutor.user_face}/>
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
        {!tutorList.completed && <Loading />}
      </main>
    )
  }
}

TutorList.propTypes = {
  tutorList: PropTypes.shape({}).isRequired,
}

function mapStateToProps(state) {
  return {
    tutorList: state.tutorList
  }
}

export default connect(
  mapStateToProps
)(TutorList)
