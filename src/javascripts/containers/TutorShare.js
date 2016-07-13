/**
 * Created by zhushihao on 2016/6/24.
 */
import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import {domainPath} from '../api/config'
import '../../stylesheets/partials/modules/TutorShare.scss'

class TutorShare extends Component{
    componentDidMount(){
        const {id} = this.props.params
        this.props.dispatch(getTutorInfo(id))
        console.log("questionInfo==="+this.props.tutorInfo)
    }
    render() {
        const { tutorInfo } = this.props
        return (
            <main className="user share" >
                <div className="user-card-bg">
                    <img src={tutorInfo.user_face} />
                </div>
                <div className="user-card">
                    <img className="avatar" src={tutorInfo.user_face} />
                    <h3 className="name">
                        {tutorInfo.user_name}
                    </h3>
                    <h4 className="title">
                        {tutorInfo.user_company}  {tutorInfo.user_position}
                    </h4>
                    <div className="description">
                        随时随地帮你解决找工作难题！
                    </div>
                    <img width="100%" src={
                                        jrQrcode.getQrBase64(`${domainPath}tutor/share/${tutorInfo.user_id}`, {
                                            padding		: 10,   //二维码四边空白，默认为10px
                                            width		: 256,  //二维码图片宽度，默认为256px
                                            height		: 256,  //二维码图片高度，默认为256px
                                            correctLevel	: 2,    //二维码容错level，默认为高
                                            background      : "#ffffff",    //二维码颜色
                                            foreground      : "#000000"     //二维码背景颜色
                                        })}
                    />
                    <div className="tip">
                        截图分享到朋友圈<br/>
                        帮助更多的学弟学妹解决困惑吧
                    </div>
                </div>
            </main>
        )
    }
}


function mapStateToProps(state) {
    return {
        tutorInfo: state.tutorInfo
    }
}

export default connect(
    mapStateToProps
)(TutorShare)