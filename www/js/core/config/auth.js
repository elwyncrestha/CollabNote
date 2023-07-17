import { AppState } from '../state'

const { getState } = AppState;

export function isAuthenticated() {
    const { authToken } = getState();
    return !!authToken;
}
