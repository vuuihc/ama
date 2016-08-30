const SearchTips = ()=>{

    return(
        <div className="search-tips">
            <div className="tip-title">历史记录</div>
            <div className="tag-list">
                {historySearch.length>0?historySearch.map((item,index)=>(
                    <div key={index} className="history-item">{item}</div>
                )):<div className="empty" >暂无记录</div>}
            </div>
            <div className="tip-title">热门搜索</div>
            <div className="tag-list">
                <div className="hot-item">郭富城</div>
                <div className="hot-item">郭富城</div>
                <div className="hot-item">郭富城</div>
                <div className="hot-item">郭富城</div>
                <div className="hot-item">郭富城</div>
                <div className="hot-item">郭富城</div>
                <div className="hot-item">郭富城</div>
                <div className="hot-item">郭富城</div>
            </div>
        </div>
    )
}

export default connect(state=>({
    historySearch: state.historySearch,
    hotSearch: state.hotSearch,
}))(SearchTips)
