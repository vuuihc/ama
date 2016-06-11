/**
 * Created by zsh on 2016/3/11.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

class HotQuestionList extends Component{
    componentDidMount(){
        console.log("hotQuestionList==="+this.props.hotQuestionList)
    }
    render() {
        //const { hotQuestionList } = this.props
        return (
            <main className="hot-question-list">
                <section>
                    <div>
                        <p>入职心仪互联网的时机有哪些？</p>
                    </div>
                    <div>

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
