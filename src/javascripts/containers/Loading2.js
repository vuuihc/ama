/**
 * Created by zhushihao on 2016/7/2.
 */
import React, { Component  } from 'react'
import "../../stylesheets/partials/common.scss"

class Loading extends Component {
  render(){
    const { completed } = this.props;
    return(
      <div className="loading" >{ completed ? '加载完成！' : '正在加载……'}</div>
    )
  }
}

export default Loading