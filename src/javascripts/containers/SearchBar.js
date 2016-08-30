const SearchBar = (

)=>{
    return(
        <div className="search-bar">
            <div className="search-icon" >
                <img src={require("../../images/search.png")} />
             </div>
            <input value="输入关键词搜索问题" />
            <button>搜索</button>
        </div>
    )
}
export default SearchBar
