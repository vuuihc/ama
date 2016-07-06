import React, {Component} from 'react'
import { Link } from 'react-router'


class QuestionItemWithAvatar extends Component{
    constructor(){
        super();
    }
    render() {
        const { question } = this.props;
        console.log(question);
        return(
            <li>
                <Link to={`question/${question.id}`}>
                    <div className="header">{ question.content }</div>
                    <div className="content">
                        <div className="headInner">
                            <img src={question.user_face} />
                        </div>
                        <div className="answer">
                            <span className="bubble">
                                <span className="bubble-tail"></span>
                                <span className="bubble-voice"></span>
                                <span className="bubble-text">{question.prize}元偷偷听</span>
                            </span>
                        </div>
                    </div>
                    <div className="innerFooter">
                        <span className="howManyListen">{ question.listen }人偷听</span>
                        <span className="howManySorrow">{ question.listen - question.dislike }人觉得赞</span>
                    </div>
                    <div className="divider"></div>
                </Link>
            </li>
        )
    }
}
export default QuestionItemWithAvatar;