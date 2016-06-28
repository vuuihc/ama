/**
 * Created by zhushihao on 2016/6/13.
 */
import fetch from 'isomorphic-fetch'
const domain = 'http://api.7dyk.com'
const env = 'development'
import data from './data.js'

export default  {
    getHotQuestionList(page,num,cb){
        const url = domain+'/api/v1/question/gettopic?page='+page+'&number='+num
        fetch(url)
            .then(response =>
                response.json()
                // data.questionList
            )
            .then(json => cb(json.data))
    },
    getQuestionInfo(id,cb){
        const url = domain+'/api/v1/question/gettopic?page='+1+'&number='+10
        fetch(url)
            .then(response =>
                response.json()
                // data.questionInfo
        )
            .then(json => cb(json.data))
    }
}