import axios from 'axios';
import {SERVER_URL} from '../constant/server_url';
import {
  GET_USER_DATA,
  GET_SELECTED_USER,
  USER_LOADING,
  GET_ERRORS,
  GET_USER_REFERRAL_DATA,
  GET_USER_STAKE_DATA,
  GET_USER_TRANSFER_DATA,
  GET_USER_WITHDRAW_DATA,
} from './type';

export const getAllUser = () => {
  return async dispatch => {
    await axios
      .get(SERVER_URL + '/users/all')
      .then(res => {
        dispatch({type: GET_USER_DATA, payload: res.data});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};

export const getUserById = id => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/users/getuser', {id})
      .then(res => {
        dispatch({type: GET_SELECTED_USER, payload: res.data});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};

export const getStakeData = ID => {
  return async dispatch => {
    await axios
      .post(SERVER_URL + '/stack/getStake', {ID})
      .then(res => {
        dispatch({type: GET_USER_STAKE_DATA, payload: res.data});
      })
      .catch(err => {
        dispatch({type: GET_ERRORS, payload: err.response.data});
      });
  };
};
