import { RECEIVE_USER_INFO } from '../../actions/ActionTypes'

const defaultState = {

}
const userInfo = (state = defaultState, action) => {
    switch(action.type){
        case RECEIVE_USER_INFO:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

export default userInfo;