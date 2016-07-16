import {RECEIVE_LISTENED, REQUEST_LISTENED, LISTENED_COMPLETED} from  '../../actions/ActionTypes'
const defaultState = {
  loading: false,
  data: [],
  completed: false,
  page: 1
}
const listened = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_LISTENED:
      return Object.assign({}, state, {loading: true});
    case RECEIVE_LISTENED:
      let dataNow = action.data.map(item => {
        return {
          answer_id: item.answer_id,
          answer_like: item.like,
          answer_listen: item.listen,
          teacher_id: item.answer_user_id,
          question_content: item.content,
          question_id: item.id,
          question_prize:item.prize,
          question_time: item.time,
          user_id: item.question_user_id,
          user_face: item.user_face,
          user_name: item.user_name,
          isAnswered: item.isanswered,
          weight: item.weight
        }
      })

      const data = state.data.concat(action.data);
      return Object.assign({}, state, {loading: false, data: data, page: state.page + 1});
    case LISTENED_COMPLETED:
      return Object.assign({}, state, {completed: true, loading: false});
    default:
      return state;
  }
}

export default listened;