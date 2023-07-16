import { AppState } from '../../../core/state';
import * as UnauthenticatedLayout from './unauthenticated-layouts';
import * as AuthenticatedLayout from './authenticated-layouts';

const { state: { isAuthenticated } } = AppState;

export default function init() {
    if (isAuthenticated) {
        AuthenticatedLayout.default();
    } else {
        UnauthenticatedLayout.default();
    }
}
