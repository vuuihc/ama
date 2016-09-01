import {connect} from "react-redux"
import {Link} from "react-router"
import {baseUrl} from "../api/config.js"

const SearchTips = ({
    historySearch,
    hotSearch
})=>{
    return(
        <div className="search-tips">
            <div className="tip-title">历史记录</div>
            <div className="tag-list">
                {historySearch.length>0?historySearch.map((item,index)=>(
                    <Link to={`${baseUrl}search/${item}`}>
                    <div key={index} className="history-item">{item}</div>
                    </Link>
                )):<div className="empty" >暂无记录</div>}
            </div>
            <div className="tip-title">热门搜索</div>
            <div className="tag-list">
                {hotSearch.length>0?hotSearch.map((item,index)=>(
                    <Link to={`${baseUrl}search/${item}`}>
                    <div key={index} className="hot-item">{item}</div>
                    </Link>
                )):<div className="empty" >暂无记录</div>}
            </div>
        </div>
    )
}

export default connect(state=>({
    historySearch: state.historySearch.data,
    hotSearch: state.hotSearch.data,
}))(SearchTips)
