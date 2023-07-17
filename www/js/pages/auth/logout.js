import { AppState } from '../../core/state';
import { getAuth, signOut } from "firebase/auth";
import { RoutesController } from '../../core/controller';
import { ROUTE_CONSTANT } from '../../core/constants';

const { getState, setState, saveState } = AppState;

const fn = () => window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#btnLogout').addEventListener('click', function(event) {
        const auth = getAuth();
        signOut (auth)
            .then(() => {
                const state = getState();
                state.authToken = null;
                setState(state);
                saveState();
                RoutesController.to(ROUTE_CONSTANT.LOGIN);
            })
            .catch((error) => {
                console.error(error);
            });
    });
});

export default fn;
