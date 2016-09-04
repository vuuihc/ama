import {browserHistory} from "react-router"
import {connect} from "react-redux"
const SearchBar = ({
    curSearch
})=>{
    let url = location.href.split("/")
    if(url.indexOf("search")>0&&curSearch&&document.querySelector("input#search-input")){
        if(document.querySelector("input#search-input").value != curSearch){
            document.querySelector("input#search-input").value=curSearch
        }
    }
    const showTips=()=>{
        // let tips = document.querySelector(".search-tips")
        // tips.style.display = "block"
        browserHistory.push(`/search/tips`)
    }
    // const hideTips=()=>{
    //     let tips = document.querySelector(".search-tips")
    //     tips.style.display = "none"
    // }
    const handleSearch=()=>{
        let query = document.querySelector("input#search-input").value
        console.log(`query is ${query}`)
        if(query!="")
            browserHistory.push(`/search/result/${query}`)
    }
    const clearInput = ()=>{
        let input = document.querySelector("input#search-input")
        input.value = ""
        input.focus()

    }
    return(
        <div className="search-bar" >
            <div className="search-icon" >
                <img src={require("../../images/search.png")} />
             </div>
            <input type="search" onFocus={showTips} id="search-input" placeholder="输入关键词搜索问题和导师" />
            <img className="close" onClick={clearInput} src={require("../../images/close.png")} />
            <button onClick={handleSearch}>搜索</button>
        </div>
    )
}
export default connect(state=>({
    curSearch: state.curSearch
}))(SearchBar)
