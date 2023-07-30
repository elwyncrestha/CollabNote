import { RoutesController } from '../controller';
import { ROUTE_CONSTANT } from '../constants';
import { AuthConfig } from '../config';

const { LOGIN, REGISTER, DASHBOARD } = ROUTE_CONSTANT;

function getCurrentPage() {
  const currentURL = document.location.pathname;
  return currentURL.substring(currentURL.lastIndexOf('/') + 1);
}

export function isPageActive(page) {
  return getCurrentPage() === page;
}

function isCheckRequired() {
  const currentPage = getCurrentPage();
  return currentPage !== LOGIN && currentPage !== REGISTER;
}

/**
 * Routes to specific page based on the auth status.
 */
export function init() {
  if (!AuthConfig.isAuthenticated()) {
    if (isCheckRequired()) {
      RoutesController.toLoginPage();
      return;
    }

    return;
  }

  const currentPage = getCurrentPage();
  if (currentPage === LOGIN || currentPage === REGISTER) {
    RoutesController.to(DASHBOARD);
  }
}
