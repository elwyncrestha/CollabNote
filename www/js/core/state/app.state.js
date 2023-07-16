import { APP_CONSTANT } from '../constants';

const { APP_STATE_KEY } = APP_CONSTANT;

let state = {
    isAuthenticated: false,
};

function saveState() {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

function restoreState() {
    state = JSON.parse(localStorage.getItem(APP_STATE_KEY));
}

export { state, saveState, restoreState };
