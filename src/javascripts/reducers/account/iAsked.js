import { CLEAR_I_ASKED, RECEIVE_I_ASKED, REQUEST_I_ASKED } from  '../../actions/ActionTypes'
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
            if(action.page == 1){
                return Object.assign({}, state, {
                    completed:action.data.length < num,
                    loading:false,
                    data:action.data
                });
            }else{
                const data = state.data.concat(action.data);
                return Object.assign({}, state, {
                    completed: action.data.length < num,
                    loading: false,
                    data: data,
                    page: state.page +1
                });
            }
        default:
            return state;
    }
}

export default iAsked;