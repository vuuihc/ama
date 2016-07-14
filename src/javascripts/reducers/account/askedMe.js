import { RECEIVE_ASKED_ME, REQUEST_ASKED_ME, ASKED_ME_COMPLETED,CLEAR_ASKED_ME } from  '../../actions/ActionTypes'
const defaultState = {
    loading:false,
    data:[],
    completed:false,
    page:1
}
const askedMe = (state = defaultState, action) => {
    switch(action.type){
        case REQUEST_ASKED_ME:
            return Object.assign({}, state, {loading: true});
        case CLEAR_ASKED_ME:
            return defaultState;
        case RECEIVE_ASKED_ME:
            const data = state.data.concat(action.data);
            return Object.assign({}, state, {loading: false, data:data, page:state.page +1});
        case ASKED_ME_COMPLETED:
            return Object.assign({}, state, {completed:true, loading:false});
        default:
            return state;
    }
}

export default askedMe;