import { SET_USER_INPUT, RESET_USER_INPUT } from 'constants/set-user-input';
// import APIService from 'api-service/api-service';
import store from '../store';

const setState = (payload) => {
   store.dispatch({ type: SET_USER_INPUT, payload});
}

const resetState = () => {
   store.dispatch({ type: RESET_USER_INPUT});
}

export default {
    setState,
    resetState,
}
