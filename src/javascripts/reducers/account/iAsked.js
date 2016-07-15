import { CLEAR_I_ASKED,RECEIVE_I_ASKED, REQUEST_I_ASKED, I_ASKED_COMPLETED } from  '../../actions/ActionTypes'
const defaultState = {
    loading:false,
    data:[],
    completed:false,
    page:1
}
const iAsked = (state = defaultState, action) => {
    switch(action.type){
        case CLEAR_I_ASKED:
            return defaultState;
        case REQUEST_I_ASKED:
            return Object.assign({}, state, {loading: true});
        case RECEIVE_I_ASKED:
            const data = state.data.concat(action.data);
            return Object.assign({}, state, {loading: false, data:data, page:state.page +1});
        case I_ASKED_COMPLETED:
            return Object.assign({}, state, {completed:true});
        default:
            return state;
    }
}

export default iAsked;