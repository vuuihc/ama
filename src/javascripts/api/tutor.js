/**
 * Created by zhushihao on 2016/6/14.
 */
import fetch from 'isomorphic-fetch'
import { domain } from './config'
import apiHandler from "../util/apiHandler"


export default  {
  getTutorList(page, num, cb){
    const url = domain + '/api/v1/user/getteacher?page=' + page + '&number=' + num
    fetch(url,{
      credentials: 'same-origin'
    })
      .then(response =>
          response.json()
        // data.tutorList
      )
      .then(json => apiHandler.handleResponse(json))
  },
  getTutorInfo(id,cb){
    const url = domain + '/api/v1/user/getuserinfo?id='+id
    fetch(url,{
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => apiHandler.handleResponse(json))
  },
  getTutorAnswerList(id,page,number,cb){
    const url = domain + `/api/v1/user/getteacheranswer?user_id=${id}&page=${page}&number=${number}`
    fetch(url,{
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => apiHandler.handleResponse(json))
  },
  getPrepayInfo(content,tutorId,cb){
    const url = domain + `/api/v1/question/testquestion?content=${content}&answer_user_id=${tutorId}`
    fetch(url,{
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => apiHandler.handleResponse(json))
  }
}