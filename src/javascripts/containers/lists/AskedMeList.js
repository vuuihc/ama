import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../../stylesheets/partials/modules/AskedMeList.scss';
import Modal from '../Modal';
import { connect } from 'react-redux'
import QuestionItemWithoutAvatarWithoutBubble from '../blocks/QuestionItemWithoutAvatarWithoutBubble';
import { getAskedMe, requestBecomeTeacher } from '../../actions/account'
import Loading from '../Loading'
import ReactDom from 'react-dom'

class AskedMeList extends Component{

    constructor(){
        super();
        this.state={
            afford:'',
            inviteCode:''
        }

    }

    componentDidMount(){
        if(this.props.data.length === 0){
            this.props.getAskedMe(1, 10);
        }
        document.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount(){
        document.removeEventListener('scroll', this.handleScroll.bind(this));
        console.log(this.refs);
    }

    handleSubmit(){
        this.props.requestBecomeTeacher(this.state.inviteCode, this.state.afford);
        this.refs.modal.close();
    }
    handleScroll() {
        if (window.scrollY + window.innerHeight == document.body.clientHeight && !this.props.completed) {
            this.props.getAskedMe(this.props.page, 10);
        }
    }
    render(){
        return (
            <div className="askedMeList">
                {
                    this.props.userInfo.is_teacher === '1' ? (
                        this.props.data.length === 0
                        // this.props.data.length
                        ? (
                            <div>
                                <div className="hint">
                                    还没有人问你
                                </div>
                                <button className="becomeTutor" onClick={(e) => {this.refs.qrcode.open();}}>
                                    让更多人了解你
                                </button>
                                <Modal ref="qrcode" left="22" top="300">
                                   <img width="100%" src={
                                        jrQrcode.getQrBase64(`http://h5app.7dyk.com/ama/7dyk/#/tutor/${this.props.userInfo.user_id}`, {
                                            padding		: 10,   //二维码四边空白，默认为10px
                                            width		: 256,  //二维码图片宽度，默认为256px
                                            height		: 256,  //二维码图片高度，默认为256px
                                            correctLevel	: 2,    //二维码容错level，默认为高
                                            background      : "#ffffff",    //二维码颜色
                                            foreground      : "#000000"     //二维码背景颜色
                                        })}
                                    />
                                </Modal>
                            </div>
                        ) : (
                            <div>
                            {
                                this.props.data.map((item, index)=>{
                                    if(item.isanswered === '1'){
                                        return <Link to={`/question/${item.id}`}><QuestionItemWithoutAvatarWithoutBubble key={index} question={item}/></Link>;
                                    }else{
                                        return <Link to={`/account/answer/${item.id}`}><QuestionItemWithoutAvatarWithoutBubble key={index} question={item}/></Link>;
                                    }
                                })
                            }
                            {
                                this.props.loading ? <Loading  /> :''
                            }
                            </div>
                        )
                    ):(
                        <div>
                            <div className="hint">
                                您还不是导师哦~
                            </div>
                            <div className="email">
                                发送个人简历到renzheng@7dyk.com
                            </div>
                            <div className="next">
                                审核通过后我们会以邮件的形式发放邀请码
                            </div>
                            <button className="becomeTutor" onClick={(e)=>{this.refs.modal.open()}}>
                                成为导师
                            </button>
                            <Modal left="22" top="330" ref="modal">
                                <div className="invitation">
                                    <span>邀请码</span>
                                    <input
                                        type="text"
                                        className="no-underline"
                                        style={{width:`${250/75}rem`}}
                                        value={this.state.inviteCode}
                                        placeholder="请输入您的邀请码"
                                        onChange={(e)=>{this.setState({inviteCode:e.target.value})}}
                                    />
                                </div>
                                <div className="afford">
                                    <span>向我提问需要支付</span>
                                    <input
                                        type="text"
                                        style={{width:`${30/75}rem`}}
                                        className="no-underline"
                                        value={this.state.afford}
                                        onChange={(e)=>{this.setState({afford:e.target.value})}}
                                    />
                                    <span>元</span>
                                </div>
                                <div className="submit" onClick={this.handleSubmit.bind(this)}>确定</div>
                            </Modal>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.account.askedMe.loading,
        data: state.account.askedMe.data,
        userInfo: state.account.userInfo,
        page:state.account.askedMe.page
    }
}

AskedMeList = connect(mapStateToProps, { getAskedMe, requestBecomeTeacher })(AskedMeList);

export default AskedMeList;
