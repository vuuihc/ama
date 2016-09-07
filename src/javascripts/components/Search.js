import {baseUrl} from "../api/config"
import SearchBar from "../containers/SearchBar"

const Search = ()=>{

    return (
      <div>
        <SearchBar />
        { this.props.children }
      </div>
    )
}
export default Search
