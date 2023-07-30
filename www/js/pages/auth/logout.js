import { AuthConfig } from '../../core/config';
import { ROUTE_CONSTANT } from '../../core/constants';
import { RoutesController } from '../../core/controller';

const fn = () => {
  document
    .querySelector('#btnLogout')
    .addEventListener('click', function (event) {
      AuthConfig.signOut().then(() => {
        RoutesController.to(ROUTE_CONSTANT.LOGIN);
      });
    });
};

export default fn;
