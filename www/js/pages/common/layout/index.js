import * as UnauthenticatedLayout from './unauthenticated-layouts';
import * as AuthenticatedLayout from './authenticated-layouts';
import { AuthConfig } from '../../../core/config';

export default function init() {
    if (AuthConfig.isAuthenticated()) {
        AuthenticatedLayout.default();
    } else {
        UnauthenticatedLayout.default();
    }
}
