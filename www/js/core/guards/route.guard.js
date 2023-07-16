import { AppState } from '../state';
import { RoutesController } from '../controller';
import { ROUTE_CONSTANT } from '../constants';

const { state: { isAuthenticated } } = AppState;
const { LOGIN, REGISTER, DASHBOARD } = ROUTE_CONSTANT;

function getCurrentPage() {
    // Get the current URL
    const currentURL = window.location.href;

    // Get the last part of the URL (page name) after the last "/"
    return currentURL.substring(currentURL.lastIndexOf("/") + 1);
}

function isCheckRequired() {
    const currentPage = getCurrentPage();
    return currentPage !== LOGIN && currentPage !== REGISTER;
}

function init() {
    if (!isAuthenticated) {
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

export default init;
