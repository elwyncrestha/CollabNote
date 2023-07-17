import { AppState } from '../../core/state';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RoutesController } from '../../core/controller';
import { ROUTE_CONSTANT } from '../../core/constants';

const { getState, setState, saveState } = AppState;

const fn = () => window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#loginUserForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        const alertDiv = document.querySelector('#formAlert');
        const alertMessageDiv = document.querySelector('#formAlertMessage');

        const auth = getAuth();
        signInWithEmailAndPassword (auth, email, password)
            .then((userCredential) => {
                /* Signed in */
                const user = userCredential.user;
                const state = getState();
                state.authToken = user;
                setState(state);
                saveState();
                alertMessageDiv.textContent = 'User registered, Please login!';
                alertMessageDiv.className = 'alert alert-success';
                event.target.reset();
                RoutesController.to(ROUTE_CONSTANT.DASHBOARD);
            })
            .catch((error) => {
                console.error(error);
                alertMessageDiv.textContent = 'Login failed, Please try again!';
                alertMessageDiv.className = 'alert alert-danger';
            })
            .finally(() => {
                alertDiv.classList.remove('d-none');
                alertDiv.classList.add('d-block');
            });
    });
});

export default fn;
