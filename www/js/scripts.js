"use strict";

const CSS = "CSS";
const JS = "JS";

const HTML_IMPORTS = {
  "simple-datatables-css": {
    type: CSS,
    href: "https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css",
    rel: "stylesheet",
  },
  "fontawesome-js": {
    type: JS,
    src: "https://use.fontawesome.com/releases/v6.3.0/js/all.js",
    crossorigin: "anonymous",
  },
  "monaca-css": {
    type: CSS,
    href: "components/loader.css",
    rel: "stylesheet",
  },
  "monaca-js": {
    type: JS,
    src: "components/loader.js",
  },
  "sb-admin-css": {
    type: CSS,
    href: "css/sb-admin.css",
    rel: "stylesheet",
  },
  "layouts-js": {
    type: JS,
    src: "js/layouts.js",
  },
  "bootstrap-js": {
    type: JS,
    src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
    crossorigin: "anonymous"
  },
  "chart-js": {
    type: JS,
    src: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js",
    crossorigin: "anonymous"
  },
  "simple-datatable-js": {
    type: JS,
    src: "https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js",
    crossorigin: "anonymous"
  },
  "chart-area-demo-js": {
    type: JS,
    src: "assets/demo/chart-area-demo.js",
  },
  "chart-bar-demo-js": {
    type: JS,
    src: "assets/demo/chart-bar-demo.js",
  },
  "simple-datatable-demo-js": {
    type: JS,
    src: "js/datatables-simple-demo.js"
  },
  "sb-admin-js": {
    type: JS,
    src: "js/sb-admin.js"
  }
};

var importCssAndJs = (importKeys = [], importAtHeader = false) => {
  var loadingStatus = [];

  importKeys.forEach((k) => {
    let el;
    const { type, href, rel, src, crossorigin } = HTML_IMPORTS[k];

    switch (type) {
      case CSS:
        el = document.createElement("link");
        el.href = href;
        el.rel = rel;
        break;
      case JS:
        el = document.createElement("script");
        el.src = src;
        el.crossOrigin = crossorigin;
        break;
    }

    loadingStatus.push(new Promise((resolve) => {
      el.onload = () => {
        console.log(`${type} ${k} loaded.`);
        resolve();
      };
    }))

    if (importAtHeader) {
      document.head.appendChild(el);
    } else {
      document.body.appendChild(el);
    }
  });

  return loadingStatus;
};

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