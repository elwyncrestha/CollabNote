import { ROUTE_CONSTANT } from '../constants';

function toLoginPage() {
    window.location.href = ROUTE_CONSTANT.LOGIN;
}

function toRegisterPage() {
    window.location.href = ROUTE_CONSTANT.REGISTER;
}

function to(url) {
    window.location.href = url;
}

export { toLoginPage, toRegisterPage, to };
