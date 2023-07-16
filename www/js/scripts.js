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
import { RouteGuard } from './core/guards';
import { Layout } from  './pages/common';

RouteGuard.default();
Layout.default();
