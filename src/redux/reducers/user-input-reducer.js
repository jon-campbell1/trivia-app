import { SET_USER_INPUT, RESET_USER_INPUT } from 'constants/set-user-input';

let initialState = {

}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_USER_INPUT: {
      return {
        ...state,
        ...action.payload
      };
    }
    case RESET_USER_INPUT: {
      return {...initialState };
    }
    default: return state;
  }
}
