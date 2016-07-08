/**
 * Created by zhushihao on 2016/7/8.
 */
export default {
  handleResponse(json,cb){
    switch(json.errCode){
      case 0:
        return cb(json.data)
        break
      case 101:
        location.href=json.data.login_url
        break
      default:
        console.error(json.msg)
    }
  },
}