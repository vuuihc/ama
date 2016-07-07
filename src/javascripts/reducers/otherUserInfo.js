import { RECEIVE_OTHER_USER_INFO } from '../actions/ActionTypes'

const otherUserInfo = (state = {}, action) => {
    switch (action.type){
        case RECEIVE_OTHER_USER_INFO:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}
export default otherUserInfo;