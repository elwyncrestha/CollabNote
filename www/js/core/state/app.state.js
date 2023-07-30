/**
 * This file will handle all logics related to the app state.
 */
import { APP_CONSTANT } from '../constants';

const { APP_STATE_KEY } = APP_CONSTANT;

/**
 * Initial app state.
 */
const CollabNoteState = {
  authUser: null,
  firebaseApp: null,
  gaAnalytics: null,
  firestore: null,
};

/**
 * Return in-memory app state.
 * @returns App state.
 */
function getState() {
  // TODO: App state temporarily stored in the window object.
  if (!window.CollabNoteState) {
    window.CollabNoteState = CollabNoteState;
  }

  return window.CollabNoteState;
}

/**
 * Sets the app state into the in-memory. Temporarily relying on `window` object.
 * @param state State object.
 */
function setState(state) {
  window.CollabNoteState = { ...state };
}

/**
 * Updates the app state based on the state parameter.
 * Usage: Just use `updateState` instead of using `getState` and `setState` consecutively.
 * @param updatedState State object with updated state keys and values.
 */
function updateState(updatedState) {
  const state = getState();
  setState({ ...state, ...updatedState });
}

const serializableStateKeys = ['authUser'];

/**
 * Serializes the app state into the `localStorage`.
 */
function saveState() {
  const serialize = {};
  const state = getState();

  serializableStateKeys.forEach((key) => (serialize[key] = state[key]));
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(serialize));
}

/**
 * Deserializes/Restores the app state from the `localStorage`.
 */
function restoreState() {
  const deserialize = localStorage.getItem(APP_STATE_KEY);
  if (!deserialize) {
    return;
  }

  const state = getState();
  const de = { ...state, ...JSON.parse(deserialize) };

  setState(de);
}

export { getState, setState, updateState, saveState, restoreState };
