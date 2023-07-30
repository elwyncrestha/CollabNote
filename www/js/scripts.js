'use strict';

// Monaca
import '../components/loader';

// Vendor
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/js/all.min';

// SB Admin
import { configureSidenavToggle } from './sb-admin';

// CollabNote
import { FirebaseConfig } from './core/config';
import { RouteGuard } from './core/guards';
import { Layout } from './pages/common';
import { LoginConfig, RegisterConfig, LogoutConfig } from './pages/auth';
import { ROUTE_CONSTANT } from './core/constants';
import { AppState } from './core/state';
import { NoteEditor, NotesFetcher } from './pages/notes';

AppState.restoreState();

(async function () {
  await FirebaseConfig.init();
  RouteGuard.init();
  Layout.default();
  configureSidenavToggle();

  const isRegisterPage = RouteGuard.isPageActive(ROUTE_CONSTANT.REGISTER);
  const isLoginPage = RouteGuard.isPageActive(ROUTE_CONSTANT.LOGIN);
  const isCreateNotePage = RouteGuard.isPageActive(ROUTE_CONSTANT.NOTE_EDITOR);
  const isViewNotesPage = RouteGuard.isPageActive(ROUTE_CONSTANT.NOTE_LIST);
  const isDashboard = RouteGuard.isPageActive(ROUTE_CONSTANT.DASHBOARD) || RouteGuard.isPageActive(ROUTE_CONSTANT.DASHBOARD_ALT);

  if (isRegisterPage) RegisterConfig.default();
  if (isLoginPage) LoginConfig.default();
  if (!isRegisterPage && !isLoginPage) LogoutConfig.default();
  if (isCreateNotePage) NoteEditor.initEditor();
  if (isDashboard || isViewNotesPage) NotesFetcher.fetchNotes('notesTable');
})();
