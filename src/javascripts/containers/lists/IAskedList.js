import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from "react-redux";
import '../../../stylesheets/partials/modules/IAskedList.scss';
import QuestionItemWithoutAvatar from '../blocks/QuestionItemWithoutAvatar';
import QuestionItemWithoutAvatarWithoutBubble from '../blocks/QuestionItemWithoutAvatarWithoutBubble';
import {getIAsked} from '../../actions/account'
import Loading from '../Loading2'
import {baseUrl} from "../../api/config"

class IAskedList extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    if (this.props.data.length === 0) {
      this.props.getIAsked(1, 10);
    }
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { completed, page }  = this.props;
    if (window.scrollY + window.innerHeight == document.body.offsetHeight && !completed) {
      console.log('hah');
      this.props.getIAsked(page, 10);
    }
  }

  render() {
    const { data, completed }  = this.props;
    return (
      <div className="iAskedList">
        {
          data.length ||  !completed? (
            <div>
              {data.map((item, index)=> {
                switch (item.isanswered) {
                  case '0':
                    return <QuestionItemWithoutAvatarWithoutBubble key={index} question={item}/>;
                  case '1':
                    return <QuestionItemWithoutAvatar key={index} question={item}/>;
                  default:
                    console.log("这个问题有问题", item);
                    return '';
                }
              })}
              <Loading completed = {completed}/>
          </div>
          ) : (
            <div>
              <div className="hint">
                你还没有问过呦~
              </div>
              <div className="go">
                快去找<Link to={baseUrl+"tutor"}>导师</Link>帮你解决问题吧~
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
    loading: state.account.iAsked.loading,
    data: state.account.iAsked.data,
    completed: state.account.iAsked.completed,
    page: state.account.iAsked.page
  }
}

IAskedList = connect(mapStateToProps, {getIAsked})(IAskedList);

export default IAskedList;
