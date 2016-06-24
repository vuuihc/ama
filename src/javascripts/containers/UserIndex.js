/**
 * Created by zhushihao on 2016/6/18.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

import '../../stylesheets/partials/modules/UserIndex.scss'

class UserIndex extends Component{
  componentDidMount(){
    // const {id} = this.props.params
    // this.props.dispatch(getTutorInfo(id))
    console.log("questionInfo==="+this.props.tutorInfo)
  }
  render() {
    const { tutorInfo } = this.props
    return (
      <main className="user" >
        <div className="user-card-bg">
          <img src="https://img.acg.moe/common/7/70/%E7%AB%A0%E9%B1%BC%E7%8C%AB.png" />
        </div>
          <div className="user-card">
            <img className="avatar" src="https://img.acg.moe/common/7/70/%E7%AB%A0%E9%B1%BC%E7%8C%AB.png" />
            <h3 className="name">
              韩东君
            </h3>
            <h4 className="title">
              北京邮电大学 计算机 研一
            </h4>
            <div className="self-intro">
              每览昔人兴感之由，若合一契，未尝不临文嗟悼，不能喻之于怀。固知一死生为虚诞，齐彭殇为妄作，后之视今，亦犹今之视昔，悲夫！故列叙时人，录其所述，虽世殊事异，所以兴怀，其致一也。后之览者，亦将有感于斯文。
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
    tutorInfo: state.tutorInfo
  }
}

export default connect(
  mapStateToProps
)(UserIndex)