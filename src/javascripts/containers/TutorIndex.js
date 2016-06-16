/**
 * Created by zhushihao on 2016/6/15.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

import {getTutorInfo} from '../actions/question.js'
import QuestionItemWithoutAvatar from "./QuestionItemWithoutAvatar"

import '../../stylesheets/partials/modules/TutorIndex.scss'

class TutorIndex extends Component{
    componentDidMount(){
        const {id} = this.props.params
        this.props.dispatch(getTutorInfo(id))
        console.log("questionInfo==="+this.props.tutorInfo)
    }
    render() {
        const { tutorInfo } = this.props
        return (
            <main className="tutor">
                <div className="tutor-info">
                    <img src={"http://ww3.sinaimg.cn/mw690/684ff39bjw1f4ugvt0wkdj208m0640sx.jpg"} />
                    <h3 className="tutor-name">倪龙云</h3>
                    <h4 className="tutor-title">战略投资总监</h4>
                    <h5 className="tutor-intro">天使投资人，一个具有情怀的导师</h5>
                    <div className="grade">
                        <div className="num">
                            <span>￥666</span>
                            <span>￥666</span>
                        </div>
                        <div className="grade-name">
                            <span>总收入</span>
                            <span>被偷听</span>
                        </div>
                    </div>
                    <textarea placeholder="向倪龙云提问，等TA语音回答；超过48小时未回答，将按支付路径全额退款"/>
                    <div className="value">￥5.2</div>
                    <a className="bottom-btn" >向TA提问</a>

                </div>
                <div className="question-list">
                    <h5 className="title">他还回答了这些问题</h5>
                    <QuestionItemWithoutAvatar />
                </div>
            </main>
        )
    }
}

TutorIndex.propTypes = {
    tutorInfo: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

function mapStateToProps(state) {
    return {
        tutorInfo: state.tutorInfo
    }
}

export default connect(
    mapStateToProps
)(TutorIndex)