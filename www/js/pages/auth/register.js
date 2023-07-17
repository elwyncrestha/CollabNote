import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const fn = () => window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#registerUserForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        const alertDiv = document.querySelector('#formAlert');
        const alertMessageDiv = document.querySelector('#formAlertMessage');

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                /* Signed in */
                const user = userCredential.user;
                alertMessageDiv.textContent = 'User registered, Please login!';
                alertMessageDiv.className = 'alert alert-success';
                event.target.reset();
            })
            .catch((error) => {
                console.error(error);
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
