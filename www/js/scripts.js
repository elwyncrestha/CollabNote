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
import './layouts';

var appState = {};

var setupDOMContentLoadedListener = (logic) => {
  if (appState.DOMContentLoaded) {
    logic();
  } else {
    window.addEventListener('DOMContentLoaded', () => logic());
  }
}

window.addEventListener('DOMContentLoaded', () => {
  appState.DOMContentLoaded = true;
});

document.querySelector('#spinner').classList.add('d-none');
document.querySelector('#layoutSidenav').classList.remove('d-none');
