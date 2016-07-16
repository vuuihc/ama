/**
 * Created by zhushihao on 2016/6/13.
 */
import fetch from 'isomorphic-fetch'
import { domain } from './config'
const env = 'development'
import apiHandler from "../util/apiHandler"

export default  {
  getHotQuestionList(page, num, cb){
    const url = domain + '/api/v1/question/gettopic?page=' + page + '&number=' + num
    fetch(url,{
      credentials: 'same-origin'
    })
      .then(response =>
          response.json()
        // data.questionList
      )
      .then(json => apiHandler.handleResponse(json,cb))
  },
  getQuestionInfo(id, cb){
    const url = domain + '/api/v1/question/getquestion?id=' + id;
    fetch(url,{
      credentials: 'same-origin'
    })
      .then(response =>
          response.json()
        // data.questionInfo
      )
      .then(json => apiHandler.handleResponse(json,cb))
  },
  getListenInfo(answerId,cb){
    fetch(`${domain}/api/v1/answer/listen?answer_id=${answerId}`,{
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(json => apiHandler.handleResponse(json,cb))
  },
  saveVoice(serverId,questionId,cb) {
    fetch( `${domain}/api/v1/answer/answer`,{
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        server_id:serverId,
        question_id:questionId
      })
    })
      .then(res => res.json())
      .then(json => {
        switch(json.errCode){
          case 0:
            cb(json.data);
            break;
          default:
            apiHandler.handleResponse(json,cb);
        }
      });
  },
  priseQuestion(questionId, cb){
    fetch(`${domain}/api/v1/question/like?answer_id=${questionId}`, {
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(json => apiHandler.handleResponse(json, cb))
  }
}