/**
 * Created by zsh on 2016/3/11.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {getHotQuestionList} from '../actions/question.js'
import {setLandPage} from '../actions/config.js'
import Loading from "./Loading2"
import  QuestionItemWithAvatar  from './blocks/QuestionItemWithAvatar'
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
    if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.hotQuestionList.completed) {
      const curPage = ++this.state.curPage;
      this.setState({curPage});
      this.props.dispatch(getHotQuestionList(curPage, 20))
    }
  }
  componentDidMount() {
    if(this.props.landPage==null){
      this.props.dispatch(setLandPage(location.href))
    }
    this.props.dispatch(getHotQuestionList(1, 10))
    document.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount(){
    document.removeEventListener('scroll', this.handleScroll);
    console.log(this.refs);
  }
  
  render() {
    const {hotQuestionList} = this.props
    return (
      <main className="hot-question-list">
        {
          hotQuestionList.data.map((question, index) =>
            <QuestionItemWithAvatar question = { question } key={index} index={index}/>
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
    landPage:state.landPage
  }
}

export default connect(
  mapStateToProps
)(HotQuestionList)
