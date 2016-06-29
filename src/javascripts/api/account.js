import { domain } from './config'

export default  {
    getUserInfo(cb) {
        fetch(domain + `/api/v1/user/getusernow`, {
            credentials: 'same-origin'
        })
            .then(res => res.json())
            .then(json => cb(json.data));
    }
}
    
