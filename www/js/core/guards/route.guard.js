import { RoutesController } from '../controller';
import { ROUTE_CONSTANT } from '../constants';
import { AuthConfig } from '../config';

const { LOGIN, REGISTER, DASHBOARD } = ROUTE_CONSTANT;

function getCurrentPage() {
    // Get the current URL
    const currentURL = window.location.href;

    // Get the last part of the URL (page name) after the last "/"
    return currentURL.substring(currentURL.lastIndexOf("/") + 1);
}

export function isPageActive(page) {
    return getCurrentPage() === page;
}

function isCheckRequired() {
    const currentPage = getCurrentPage();
    return currentPage !== LOGIN && currentPage !== REGISTER;
}

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
