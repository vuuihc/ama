import { domain } from './config'

export default  {
    getUserInfo(cb) {
        
        fetch(domain + `/api/v1/user/getusernow`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => {
                switch(json.errCode){
                    case 0:
                        cb(json.data);
                        break;
                    default:
                        console.log('获取用户信息失败', json);
                }
            });
    },
    getOtherUserInfo(id, cb) {
        fetch(domain + `/api/v1/user/getuserinfo?id=${id}`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => {
                switch(json.errCode){
                    case 0:
                        cb(json.data);
                        break;
                    default:
                        console.log('获取用户信息失败', json);
                }
            });
    },
    editUserInfo(company, job, experience, introduction, cb) {
      fetch( domain + `/api/v1/user/editusernow`,{
          credentials: 'same-origin',
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({
              company,
              job,
              experience,
              introduction
          })
      })
          .then(res => res.json())
          .then(json => {
              switch(json.errCode){
                  case 0:
                      cb(json.data);
                      break;
                  default:
                      console.log('修改用户信息失败', json);
              }
          });
    },
    getListened(page, num, cb) {
        return fetch(domain + `/api/v1/question/mylisten?page=${page}&number=${num}`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => {
                switch(json.errCode){
                    case 0:
                        cb(json.data);
                        break;
                    default:
                        console.log('获取听过的列表失败', json);
                }
            })
    },
    getIAsked(page, num, cb) {
        return fetch(domain + `/api/v1/question/myquestion?page=${page}&number=${num}`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => {
                switch(json.errCode){
                    case 0:
                        cb(json.data);
                        break;
                    default:
                        console.log('获取我问列表失败', json);
                }
            })
    },
    getAskedMe(page, num, cb) {
        return fetch(domain + `/api/v1/question/myanswer?page=${page}&number=${num}`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => {
                switch(json.errCode){
                    case 0:
                        cb(json.data);
                        break;
                    default:
                        console.log('获取我问列表失败', json);
                }
            })
    },
    requestBecomeTeacher(invite, prize, cb){
        return fetch(domain + '/api/v1/user/beteacher',{
            credentials: 'same-origin',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                invite,
                prize
            })
        })
            .then(res => res.json())
            .then(json => {
                switch(json.errCode){
                    case 0:
                        cb(json.data);
                        break;
                    default:
                        alert(json.msg);
                }
            })
    }
}
    
