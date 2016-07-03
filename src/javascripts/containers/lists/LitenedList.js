import React, { Component } from 'react'
import { Link } from 'react-router'
import '../../../stylesheets/partials/modules/LitenedList.scss'
import { getListened } from '../../actions/account'
import { connect } from 'react-redux'
import Loading from '../Loading'
import QuestionItemWithAvatar from '../blocks/QuestionItemWithAvatar'

class LitenedList extends Component{
    constructor(){
        super();
        this.state = {
            curPage: 1
        }
    }
    componentDidMount(){
        this.props.getListened(1, 10);
        this.handleScroll = this.handleScroll.bind(this);
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(){
        document.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.completed) {
            const curPage = ++this.state.curPage;
            this.setState({curPage});
            this.props.getListened(curPage, 10);
        }
    }

    render(){
        return (
            <div className="askMeList">
                {
                    this.props.data.length ? (
                        <ul>
                            {
                                this.props.data.map((question, index) => {
                                    return <QuestionItemWithAvatar question={question} key={index} />;
                                })
                            }
                            {
                                this.props.loading ? <Loading /> : ''
                            }
                        </ul>
                    ):(
                        <div>
                            <div className="hint">
                                你还没有偷听过呦~{this.props.data.length}
                            </div>
                            <div className="go">
                                快去<Link to="/hot">热门</Link>逛一逛吧~
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.account.listened.completed);
    console.log('数据', state.account.listened.data);
    return {
        loading: state.account.listened.loading,
        data: state.account.listened.data,
        compeleted: state.account.listened.completed
    }
}
LitenedList = connect(mapStateToProps, { getListened })(LitenedList);
export default LitenedList;
