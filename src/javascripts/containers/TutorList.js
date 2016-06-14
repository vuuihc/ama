/**
 * Created by zhushihao on 2016/6/14.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import {getTutorList} from '../actions/tutor.js'

import '../../stylesheets/partials/modules/TutorList.scss'

class TutorList extends Component{
    componentDidMount(){
        this.props.dispatch(getTutorList(1,10))
        console.log("tutorList==="+this.props.tutorList)
    }
    render() {
        const { tutorList } = this.props
        return (
            <main className="tutor-list">
                {
                    tutorList.map((tutor,index) =>
                        <article>
                            <div className="tutor-info">
                                <img src={tutor.avatar} />
                                <div className="tutor-intro">
                                    <h3 >{tutor.name}</h3>
                                    <h4>
                                        <span>{tutor.company}</span>
                                        <span>{tutor.position}</span>
                                    </h4>
                                </div>
                            </div>
                            <div className="answer-info">
                                {tutor.answer_num}个回答
                            </div>
                        </article>
                    )
                }
            </main>
        )
    }
}

TutorList.propTypes = {
    tutorList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
}

function mapStateToProps(state) {
    return {
        tutorList: state.tutorList
    }
}

export default connect(
    mapStateToProps
)(TutorList)
