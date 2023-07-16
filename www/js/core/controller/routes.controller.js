import { ROUTE_CONSTANT } from '../constants';

function toLoginPage() {
    window.location.href = ROUTE_CONSTANT.LOGIN;
}

function toRegisterPage() {
    window.location.href = ROUTE_CONSTANT.L
}

function to(url) {
    window.location.href = url;
}

export { toLoginPage, toRegisterPage, to };
