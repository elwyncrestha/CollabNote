"use strict";

// Monaca
import '../components/loader';

// Vendor
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/js/all.min';

// SB Admin
import './sb-admin';
import './simple-datatables';

// CollabNote
import { FirebaseConfig } from './core/config';
import { RouteGuard } from './core/guards';
import { Layout } from  './pages/common';
import { LoginConfig, RegisterConfig, LogoutConfig } from './pages/auth';
import { ROUTE_CONSTANT } from './core/constants'
import { AppState } from './core/state';

AppState.restoreState();
FirebaseConfig.default();
RouteGuard.init();
Layout.default();

const isRegisterActive = RouteGuard.isPageActive(ROUTE_CONSTANT.REGISTER);
const isLoginActive = RouteGuard.isPageActive(ROUTE_CONSTANT.LOGIN);

if (isRegisterActive) RegisterConfig.default();
if (isLoginActive) LoginConfig.default();
if (!isRegisterActive && !isLoginActive) LogoutConfig.default();
