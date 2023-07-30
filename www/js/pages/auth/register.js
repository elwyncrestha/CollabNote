import { AuthConfig } from "../../core/config";

const fn = () => window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#registerUserForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        const alertDiv = document.querySelector('#formAlert');
        const alertMessageDiv = document.querySelector('#formAlertMessage');

        AuthConfig.signUp(email, password)
            .then(() => {
                alertMessageDiv.textContent = 'User registered, Please login!';
                alertMessageDiv.className = 'alert alert-success';
                event.target.reset();
            })
            .catch(() => {
                alertMessageDiv.textContent = 'User registration failed, Please try again!';
                alertMessageDiv.className = 'alert alert-danger';
            })
            .finally(() => {
                alertDiv.classList.remove('d-none');
                alertDiv.classList.add('d-block');
            });
    });
});

export default fn;
