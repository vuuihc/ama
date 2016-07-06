/**
 * Created by zhushihao on 2016/6/13.
 */
import fetch from 'isomorphic-fetch'
const domain = 'http://api.7dyk.com'
const env = 'development'
import data from './data.js'

export default  {
  getHotQuestionList(page, num, cb){
    const url = domain + '/api/v1/question/gettopic?page=' + page + '&number=' + num
    fetch(url)
      .then(response =>
          response.json()
        // data.questionList
      )
      .then(json => cb(json.data))
  },
  getQuestionInfo(id, cb){
    const url = domain + '/api/v1/question/getquestion?id=' + id;
    fetch(url)
      .then(response =>
          response.json()
        // data.questionInfo
      )
      .then(json => cb(json.data))
  },
  getListenInfo(answerId,cb){
    fetch(`${domain}/api/v1/answer/listen?answer_id=${answerId}`)
      .then(response => response.json())
      .then(json => cb(json.data))
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
            console.log('上传录音失败', json);
        }
      });
  }
}