import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  //storing in local storage allows user to leave app and come back authenticated without having to make a request to the server
  authenticated: localStorage.getItem('token') || '',
  errorMessage: '',
  email: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload.token,
          email: action.payload.email || null
        };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}