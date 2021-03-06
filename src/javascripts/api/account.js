import { domain } from './config'
import apiHandler from "../util/apiHandler"
import message from '../util/weui/message'

export default  {
    getUserInfo(cb) {

        fetch(domain + `/api/v1/user/getusernow`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => apiHandler.handleResponse(json,cb));
    },
    getOtherUserInfo(id, cb) {
        fetch(domain + `/api/v1/user/getuserinfo?id=${id}`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => apiHandler.handleResponse(json, cb));
    },
    editUserInfo(company, job, experience, teacher_prize, introduction, cb) {
      fetch( domain + `/api/v1/user/editusernow`,{
          credentials: 'same-origin',
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              company,
              position:job,
              experience,
              prize:teacher_prize,
              introduction
          })
      })
          .then(res => res.json())
          .then(json => apiHandler.handleResponse(json,cb));
    },
    getListened(page, num, cb) {
        return fetch(domain + `/api/v1/question/mylisten?page=${page}&number=${num}`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => apiHandler.handleResponse(json,cb))
    },
    getIAsked(page, num, cb) {
        return fetch(domain + `/api/v1/question/myquestion?page=${page}&number=${num}`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => apiHandler.handleResponse(json,cb))
    },
    getAskedMe(page, num, cb) {
        return fetch(domain + `/api/v1/question/myanswer?page=${page}&number=${num}`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => apiHandler.handleResponse(json,cb))
    },
    requestBecomeTeacher(invite, prize, cb){
        return fetch(domain + '/api/v1/user/beteacher',{
            credentials: 'same-origin',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                invite,
                prize
            })
        })
            .then(res => res.json())
            .then(json => {
                if(json.errCode != 0){
                    message.alert('您输入的邀请码有误，请核对后填写',() =>{console.log('hide')});
                }
                return apiHandler.handleResponse(json,cb)
            })
    }
}
