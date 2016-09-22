import { RECEIVE_ASKED_ME, REQUEST_ASKED_ME, ASKED_ME_COMPLETED,CLEAR_ASKED_ME } from  '../../actions/ActionTypes'
const defaultState = {
    loading:false,
    data:[],
    completed:false,
    page:1
}
const askedMe = (state = defaultState, action) => {
    switch(action.type){
        case CLEAR_ASKED_ME:
            return defaultState;
        case REQUEST_ASKED_ME:
            return Object.assign({}, state, {loading: true});
        case RECEIVE_ASKED_ME:
            if(action.page == 1){
                return Object.assign({}, state, {
                    data: action.data,
                    page:state.page +1,
                    completed: action.data.length < action.num,
                    loading: false
                });
            }else{
                const data = state.data.concat(action.data);
                return Object.assign({}, state, {
                    loading: false, 
                    data:data, 
                    page:state.page +1,
                    completed: action.data.length < action.num ? true : false,
                });
            }
        default:
            return state;
    }
}

export default askedMe;