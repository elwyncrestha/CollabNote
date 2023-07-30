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
import { NoteEditor } from './pages/notes';

AppState.restoreState();
FirebaseConfig.init();
RouteGuard.init();
Layout.default();

const isRegisterPage = RouteGuard.isPageActive(ROUTE_CONSTANT.REGISTER);
const isLoginPage = RouteGuard.isPageActive(ROUTE_CONSTANT.LOGIN);
const isCreateNotePage = RouteGuard.isPageActive(ROUTE_CONSTANT.NOTE_EDITOR);

if (isRegisterPage) RegisterConfig.default();
if (isLoginPage) LoginConfig.default();
if (!isRegisterPage && !isLoginPage) LogoutConfig.default();
if (isCreateNotePage) NoteEditor.initEditor();
