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
    getListened(page, num, cb) {

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
    getListened(page, num, cb) {
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
    }
}
    
