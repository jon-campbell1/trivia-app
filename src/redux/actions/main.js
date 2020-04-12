import { SET_MAIN_STATE, RESET_MAIN_STATE } from 'constants/set-main-state';
import store from '../store';

const setState = (payload) => {
    store.dispatch({ type: SET_MAIN_STATE, payload});
}

const resetState = () => {
    store.dispatch({ type: RESET_MAIN_STATE});
}

export default {
    setState,
    resetState
}
