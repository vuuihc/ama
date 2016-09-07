import {baseUrl} from "../api/config"
import SearchBar from "../containers/SearchBar"

const Search = ({children})=>{

    return (
      <div>
        <SearchBar />
        { children }
      </div>
    )
}
export default Search
