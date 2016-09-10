import account from '../api/account'
import {
  CLEAR_ASKED_ME,
  CLEAR_I_ASKED,
  REQUEST_LISTENED,
  REQUEST_ASKED_ME,
  REQUEST_I_ASKED,
  RECEIVE_USER_INFO,
  RECEIVE_LISTENED,
  RECEIVE_I_ASKED,
  RECEIVE_ASKED_ME,
  LISTENED_COMPLETED,
  I_ASKED_COMPLETED,
  ASKED_ME_COMPLETED,
  RECEIVE_OTHER_USER_INFO,
} from './ActionTypes'
import message from '../util/weui/message'

export function getUserInfo() {
  return (dispatch) => {
    account.getUserInfo((data) => {
      dispatch({
        type: RECEIVE_USER_INFO,
        data
      })
    })
  }
}

export function getOtherUserInfo(id) {
  return (dispatch) => {
    account.getOtherUserInfo(id, (data) => {
      dispatch({
        type: RECEIVE_OTHER_USER_INFO,
        data
      })
    })
  }
}

export function editUserInfo(company, job, experience,teacher_prize, introduction) {
  return (dispatch) => {
    account.editUserInfo(company, job, experience, teacher_prize,introduction, (data) => {
      dispatch({
        type: RECEIVE_USER_INFO,
        data
      })
    });
  }
}
export function getListened(page, num) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_LISTENED
    });
    account.getListened(page, num, (data) => {
      if (data.length === 0) {
        dispatch({
          type: LISTENED_COMPLETED
        });
      } else {
        dispatch({
          type: RECEIVE_LISTENED,
          data
        })
      }
    })
  }
}

export function getIAsked(page, num) {
  return (dispatch) => {
    if(page==1){
      dispatch({
        type: CLEAR_I_ASKED
      })
    }
    dispatch({
      type: REQUEST_I_ASKED
    });
    account.getIAsked(page, num, (data) => {
      if (data.length === 0) {
        dispatch({
          type: I_ASKED_COMPLETED
        });
      } else {
        dispatch({
          type: RECEIVE_I_ASKED,
          data
        })
      }
    })
  }
}

export function getAskedMe(page, num) {
  return (dispatch) => {
    if(page==1){
      dispatch({
        type: CLEAR_ASKED_ME
      })
    }
    dispatch({
      type: REQUEST_ASKED_ME
    });
    account.getAskedMe(page, num, (data) => {
      if (data.length === 0) {
        dispatch({
          type: ASKED_ME_COMPLETED
        });
      } else {
        dispatch({
          type: RECEIVE_ASKED_ME,
          data
        })
      }
    })
  }
}
export function clearAskedMe() {
  return dispatch => {
    dispatch({
      type: CLEAR_ASKED_ME
    })
  }
}

export function requestBecomeTeacher(invite, prize) {
  return (dispatch) => {
    account.requestBecomeTeacher(invite, prize, (data) => {
      message.success('申请成功!', 1.5, () =>{window.location.reload()});
      dispatch({
        type: RECEIVE_USER_INFO,
        data
      })
    })
  }
}
