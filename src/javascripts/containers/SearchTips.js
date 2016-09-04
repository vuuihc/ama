import React,{Component} from "react"
import {connect} from "react-redux"
import {Link} from "react-router"
import {baseUrl} from "../api/config.js"
import Loading from "./Loading"
import {getHistorySearch,getHotSearch,deleteHistory} from "../actions/search.js"

class SearchTips  extends Component{
    componentDidMount(){
        const {historySearch,hotSearch,getHistory,getHot} = this.props
        if((!historySearch.completed)&&(!historySearch.loading)){
            getHistory(historySearch.page,10)
        }
        console.log(`out hotSearch.completed==${hotSearch.completed} hotSearch.loading==${hotSearch.loading} `)
        if((!hotSearch.completed)&&(!historySearch.loading)){
            getHot()
            console.log(`in hotSearch.completed==${hotSearch.completed} hotSearch.loading==${hotSearch.loading} `)
        }
    }
    deleteHistory(){
        this.props.deleteHistory()
    }
    render(){
        const {historySearch,hotSearch} = this.props
        return(
            <div className="search-tips">
                <div className="tip-title">历史记录</div>
                {historySearch.data.length>0?<img className="delete-icon" onClick={this.deleteHistory.bind(this)} src={require("../../images/delete.png")} />:""}
                <div className="tag-list">
                    {historySearch.data.length>0?historySearch.data.map((item,index)=>(
                        <Link key={index} to={`${baseUrl}search/result/${item}`}>
                            <div  className="history-item">{item}</div>
                        </Link>
                    )):(historySearch.loading?<Loading />:<div className="empty" >暂无记录</div>)}
                </div>
                <div className="tip-title">热门搜索</div>
                <div className="tag-list">
                    {hotSearch.data.length>0?hotSearch.data.map((item,index)=>(
                        <Link key={index} to={`${baseUrl}search/result/${item.search}`}>
                            <div  className="hot-item">{item.search}</div>
                        </Link>
                    )):(hotSearch.loading?<Loading />:<div className="empty" >暂无记录</div>)}
                </div>
            </div>
        )
    }
}

export default connect(state=>({
    historySearch: state.historySearch,
    hotSearch: state.hotSearch
}),dispatch=>({
    getHistory:(page,num)=>{
        dispatch(getHistorySearch(page,num))
    },
    getHot:()=>{
        dispatch(getHotSearch())
    },
    deleteHistory:()=>{
        dispatch(deleteHistory())
    }
}))(SearchTips)
