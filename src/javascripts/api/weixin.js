/**
 * Created by zsh on 2016/7/11.
 */
import apiHandler from "../util/apiHandler"
export default {
  getWXConfig(url,cb){
    fetch(`http://api.7dyk.com/api/v1/question/test`,{
      //credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url
      })
    })
    .then(response => response.json())
    .then(json => apiHandler.handleResponse(json,cb))
  }
}