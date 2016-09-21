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
          answer_ispayed:1,
          answer_listen: item.listen,
          teacher_id: item.teacher_id,
          teacher_face: item.teacher_face,
          teacher_name: item.teacher_name,
          teacher_position: item.teacher_position,
          question_content: item.content,
          question_id: item.id,
          question_prize:item.prize,
          question_time: item.time,
          user_id: item.question_user_id,
          isAnswered: item.isanswered,
          weight: item.weight
        }
      })
      if(action.page == 1){
        return Object.assign({}, state, {
          completed: action.data.length < num,
          loading: false,
          data: dataNow
        });
      }else{
        const data = state.data.concat(dataNow);
        return Object.assign({}, state, {
          completed:action.data.length < num,
          loading: false,
          data: data,
          page: state.page + 1
        });
      }
    default:
      return state;
  }
}

export default listened;