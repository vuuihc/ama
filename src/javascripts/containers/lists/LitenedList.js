import React, {Component} from 'react'
import {Link} from 'react-router'
import '../../../stylesheets/partials/modules/LitenedList.scss'
import {getListened} from '../../actions/account'
import {connect} from 'react-redux'
import Loading from '../Loading2'
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
    $('.app-container').on('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    $('.app-container').off('scroll', this.handleScroll);
  }


  handleScroll() {
    const { completed, page, loading }  = this.props;
    let container = document.getElementsByClassName('app-container')[0];
    if (!loading && container.clientHeight + container.scrollTop + 1 >= container.scrollHeight  && !completed) {
      this.props.getListened(page, 10);
    }
  }

  render() {
    const { data, completed } = this.props;
    return (
      <div className="askMeList">
        {
          data.length || !completed ? (
            <ul>
              {
                data.map((question, index) => {
                  return <QuestionItemWithAvatar question={question} key={index}/>;
                })
              }
               <Loading completed = {completed}/>
            </ul>
          ) : (
            <div>
              <div className="hint">
                你还没有偷听过呦~{data.length}
              </div>
              <div className="go">
                快去<Link to={baseUrl}>热门</Link>逛一逛吧~
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
