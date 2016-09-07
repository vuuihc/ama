import fetch from 'isomorphic-fetch'
import {
    domain
} from './config'
const env = 'development'
import apiHandler from "../util/apiHandler"

export default {
    getHotSearch(cb) {
        let url = `${domain}/api/v1/hot`
        fetch(url, {
                credentials: 'same-origin'
            })
            .then(response =>
                response.json()
                // data.questionList
            )
            .then(json => apiHandler.handleResponse(json, cb))
    },
    getHistorySearch(page, num, cb){
        let url = `${domain}/api/v1/history?page=${page}&number=${num}`
        fetch(url, {
                credentials: 'same-origin'
            })
            .then(response =>
                response.json()
            )
            .then(json => apiHandler.handleResponse(json, cb))
    },
    deleteHistory(cb){
        let url = `${domain}/api/v1/history/delete`
        fetch(url,{
                credentials: 'same-origin',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response =>
                response.json()
            )
            .then(json => apiHandler.handleResponse(json, cb))
    }

}
