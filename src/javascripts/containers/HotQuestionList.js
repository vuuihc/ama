/**
 * Created by zsh on 2016/3/11.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {getHotQuestionList} from '../actions/question.js'
import Loading from "./Loading2"
import  QuestionItemWithAvatar  from './blocks/QuestionItemWithAvatar'
import SearchBar from "./SearchBar"
import '../../stylesheets/partials/modules/HotQuestionList.scss'

class HotQuestionList extends Component {
  constructor(props){
    super(props)
    this.state={
      curAudio:"",
      curPage:1,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll(){
    let container = document.getElementsByClassName('app-container')[0];
    if (container.clientHeight + container.scrollTop + 1 >= container.scrollHeight  && !this.props.hotQuestionList.completed) {
      const curPage = ++this.state.curPage;
      this.setState({curPage});
      this.props.dispatch(getHotQuestionList(curPage, 20))
    }
  }
  componentDidMount() {
    this.props.dispatch(getHotQuestionList(1, 10))
    $('.app-container').on('scroll', this.handleScroll);
  }
  componentWillUnmount(){
    $('.app-container').off('scroll', this.handleScroll);
  }
  render() {
    const {hotQuestionList,userId} = this.props
    return (
      <main className="hot-question-list">
        <SearchBar />
        {
          hotQuestionList.data.map((question, index) =>
            <QuestionItemWithAvatar userId={userId} question = { question } key={index} index={index}/>
          )
        }
        <Loading completed = { hotQuestionList.completed } />
      </main>
    )
  }
}

HotQuestionList.propTypes = {
  hotQuestionList: PropTypes.shape({}).isRequired,
  listenInfo: PropTypes.shape({
    data:PropTypes.shape({}).isRequired
  }).isRequired
}
HotQuestionList.contextTypes = {
  router: PropTypes.object
}
function mapStateToProps(state) {
  return {
    hotQuestionList: state.hotQuestionList,
    listenInfo:state.listenInfo,
    userId: state.account.userInfo.user_id
  }
}

export default connect(
  mapStateToProps
)(HotQuestionList)
