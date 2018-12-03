import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initalState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initalState, action) => {
  switch (action.type) {

    case 'REGISTER':
      return {
        user: action.userData
      };

    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };


    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};
