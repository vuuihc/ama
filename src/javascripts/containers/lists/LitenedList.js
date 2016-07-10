import React, {Component} from 'react'
import {Link} from 'react-router'
import '../../../stylesheets/partials/modules/LitenedList.scss'
import {getListened} from '../../actions/account'
import {connect} from 'react-redux'
import Loading from '../Loading'
import QuestionItemWithAvatar from '../blocks/QuestionItemWithAvatar'
import {baseUrl} from "../../api/config"
class LitenedList extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if (this.props.data.length === 0) {
      this.props.getListened(1, 10);
    }
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.completed) {
      this.props.getListened(this.props.page, 10);
    }
  }

  render() {
    return (
      <div className="askMeList">
        {
          this.props.data.length ? (
            <ul>
              {
                this.props.data.map((question, index) => {
                  return <QuestionItemWithAvatar question={question} key={index}/>;
                })
              }
              {
                this.props.loading ? <Loading /> : ''
              }
            </ul>
          ) : (
            <div>
              <div className="hint">
                你还没有偷听过呦~{this.props.data.length}
              </div>
              <div className="go">
                快去<Link to={baseUrl+"hot"} >热门</Link>逛一逛吧~
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.account.listened.loading,
    data: state.account.listened.data,
    completed: state.account.listened.completed,
    page: state.account.listened.page
  }
}
LitenedList = connect(mapStateToProps, {getListened})(LitenedList);
export default LitenedList;
