import {GET_PROFILE_DATA, PROFILE_LOADING} from '../actions/type';

const initialState = {
  profiledata: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_DATA:
      return {
        ...state,
        profiledata: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
