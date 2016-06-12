/**
 * Created by zsh on 2016/3/11.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

import '../../stylesheets/partials/modules/HotQuestionList.scss'

class HotQuestionList extends Component{
    componentDidMount(){
        console.log("hotQuestionList==="+this.props.hotQuestionList)
    }
    render() {
        const { hotQuestionList } = this.props
        return (
            <main className="hot-question-list">
                <section>
                    <div className="question-content">
                        <p>入职心仪互联网的时机有哪些？</p>
                    </div>
                    <div className="mentor">
                        <img src="" />
                        <p >
                            <span>韩东君</span>
                            <span>ceo</span>
                        </p>
                    </div>
                    <div className="answer">
                        <span className="bubble-tail"></span>
                        <span className="bubble">
                            <span className="bubble-text">一元偷偷听</span>
                        </span>
                    </div>
                    <div className="remark">
                        <p className="value">价值￥5.2</p>
                        <p className="remark-info">
                            <span>54人偷听</span>
                            <span>3人觉得亏了</span>
                        </p>
                    </div>
                </section>
            </main>
        )
    }
}

HotQuestionList.propTypes = {
    hotQuestionList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
}

function mapStateToProps(state) {
    return {
        hotQuestionList: state.hotQuestionList
    }
}

export default connect(
    mapStateToProps
)(HotQuestionList)
