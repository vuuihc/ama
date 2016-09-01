import {browserHistory} from "react-router"
const SearchBar = (

)=>{
    const showTips=()=>{
        let tips = document.querySelector(".search-tips")
        tips.style.display = "block"
    }
    const hideTips=()=>{
        let tips = document.querySelector(".search-tips")
        tips.style.display = "none"
    }
    const handleSearch=()=>{
        let query = document.querySelector("input#search-input").value
        console.log(`query is ${query}`)
        if(query!="")
            browserHistory.push(`/search/${query}`)
    }
    return(
        <div className="search-bar" >
            <div className="search-icon" >
                <img src={require("../../images/search.png")} />
             </div>
            <input onClick={showTips} onBlur={()=>setTimeout(hideTips,500)} id="search-input" placeholder="输入关键词搜索问题" />
            <button onClick={handleSearch}>搜索</button>
        </div>
    )
}
export default SearchBar
