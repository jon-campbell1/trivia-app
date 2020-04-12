import { combineReducers } from 'redux';
import userInput from './user-input-reducer';
import mainState from './main-reducer';

const rootReducer = combineReducers({
  userInput,
  mainState,
});

export default rootReducer;
