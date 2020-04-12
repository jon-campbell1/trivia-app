import { SET_MAIN_STATE, RESET_MAIN_STATE } from 'constants/set-main-state';

const initialState = {
  currentQuestion: 0,
  questions: [],
  page: "",
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_MAIN_STATE: {
      return {
        ...state,
        ...action.payload
      };
    }
    case RESET_MAIN_STATE: {
      return {...initialState, page: "intro" };
    }
    default: return state;
  }
}
