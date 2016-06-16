/**
 * Created by zhushihao on 2016/6/14.
 */
import fetch from 'isomorphic-fetch'
const domain = 'http://api.7dyk.com'
const env = 'development'
import data from './data.js'

export default  {
    getTutorList(page,num,cb){
        const url = domain+'/api/v1/question/gettopic?page='+page+'&number='+num
        fetch(url)
            .then(response =>
                response.json()
                //data.tutorList
            )
            .then(json => cb(json.data))
    }
}