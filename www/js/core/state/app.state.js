import { APP_CONSTANT } from '../constants';

const { APP_STATE_KEY } = APP_CONSTANT;

const CollabNoteState = {
    authToken: null,
    firebaseApp: null,
    gaAnalytics: null,
};

function getState() {
    // TODO: App state temporarily stored in the window object.
    if (!window.CollabNoteState) {
        window.CollabNoteState = CollabNoteState;
    }

    return window.CollabNoteState;
}

function setState(state) {
    window.CollabNoteState = { ...state };
}

const serializableStateKeys = ['authToken'];

function saveState() {
    const serialize = {};
    const state = getState();
    
    serializableStateKeys.forEach(key => serialize[key] = state[key]);
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(serialize));
}

function restoreState() {
    const deserialize = localStorage.getItem(APP_STATE_KEY);
    if (!deserialize) {
        return;
    }

    const state = getState();
    const de = { ...state, ...JSON.parse(deserialize) };

    setState(de);
}

export { getState, setState, saveState, restoreState };
