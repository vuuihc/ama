/**
 * Created by zhushihao on 2016/6/30.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import '../../stylesheets/partials/modules/Modal.scss'
import  ReactDOM  from 'react-dom'
export default class Modal extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.modalElement = ReactDOM.findDOMNode(this);
  }

  open() {
    this.modalElement.style.display = 'block';
  }

  close() {
    this.modalElement.style.display = 'none';
  }

  confirm() {
    this.props.confirm();
  }

  render() {
    const left = (this.props.left) ? this.props.left / 75 : 22 / 75;
    const top = (this.props.top) ? this.props.top / 75 : 200 / 75;
    const bottom = (this.props.bottom) ? this.props.bottom / 75 : undefined;
    return (
      <div className="modal-package-blur" id="modal">
        <div className="modal-content"
             style={{left: `${left}rem`, right:`${left}rem`, top:`${top}rem`, bottom:`${bottom}rem`}}>
          <div className="modal-header">
            <h4 className="title">{this.props.title}</h4>
            <div className="close" onClick={this.close.bind(this)}>x</div>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer"></div>
        </div>
        <div className="modal-background" onClick={() => {this.close();}}></div>
      </div>
    )
  }

}