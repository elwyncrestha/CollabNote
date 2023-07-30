import { RoutesController } from '../../core/controller';
import { ROUTE_CONSTANT } from '../../core/constants';
import { AuthConfig } from '../../core/config';

const fn = () => {
  document
    .querySelector('#loginUserForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const email = formData.get('email');
      const password = formData.get('password');

      const alertDiv = document.querySelector('#formAlert');
      const alertMessageDiv = document.querySelector('#formAlertMessage');

      AuthConfig.signIn(email, password)
        .then(() => {
          alertMessageDiv.textContent = 'Authentication successful!';
          alertMessageDiv.className = 'alert alert-success';
          event.target.reset();
          RoutesController.to(ROUTE_CONSTANT.DASHBOARD);
        })
        .catch(() => {
          alertMessageDiv.textContent = 'Login failed, Please try again!';
          alertMessageDiv.className = 'alert alert-danger';
        })
        .finally(() => {
          alertDiv.classList.remove('d-none');
          alertDiv.classList.add('d-block');
        });
    });
};

export default fn;
