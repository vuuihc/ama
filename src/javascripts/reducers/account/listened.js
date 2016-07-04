import { RECEIVE_LISTENED, REQUEST_LISTENED, LISTENED_COMPLETED } from  '../../actions/ActionTypes'
const defaultState = {
    loading:false,
    data:[],
    completed:false,
    page:1
}
const listened = (state = defaultState, action) => {
    switch(action.type){
        case REQUEST_LISTENED:
            return Object.assign({}, state, {loading: true});
        case RECEIVE_LISTENED:
            const data = state.data.concat(action.data);
            return Object.assign({}, state, {loading: false, data:data, page:state.page + 1});
        case LISTENED_COMPLETED:
            return Object.assign({}, state, {completed:true});
        default:
            return state;
    }
}

export default listened;