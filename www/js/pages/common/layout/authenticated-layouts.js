const navbarLayout = `
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <!-- Navbar Brand-->
      <a class="navbar-brand ps-3" href="index.html">CollabNote</a>
      <!-- Sidebar Toggle-->
      <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
      <!-- Navbar Search-->
      <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div class="input-group">
              <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
              <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
          </div>
      </form>
      <!-- Navbar-->
      <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#!">Settings</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><button id="btnLogout" type="button" class="dropdown-item">Logout</button></li>
              </ul>
          </li>
      </ul>
  </nav>
`;

const initNavbar = () => {
  const navbarEl = document.createElement('div');
  navbarEl.innerHTML = navbarLayout;
  document.body.insertBefore(navbarEl, document.body.firstChild);
};

const sidenavLayout = `
  <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
  <div class="sb-sidenav-menu">
      <div class="nav">
          <div class="sb-sidenav-menu-heading">Home</div>
          <a class="nav-link" href="index.html">
              <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
              Dashboard
          </a>
          <div class="sb-sidenav-menu-heading">Contents</div>
          <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
              <div class="sb-nav-link-icon"><i class="fas fa-note-sticky"></i></div>
              Notes
              <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
          </a>
          <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
              <nav class="sb-sidenav-menu-nested nav">
                  <a class="nav-link" href="note-editor.html">New Note</a>
                  <!-- TODO: Add separate page for View Notes -->
                  <a class="nav-link" href="note-list.html">View Notes</a>
              </nav>
          </div>
      </div>
  </div>
  <div class="sb-sidenav-footer">
      <div class="small">Logged in as:</div>
      Start Bootstrap
  </div>
  </nav>
`;

const initSidenav = () =>
    (document.querySelector("#layoutSidenav_nav").innerHTML += sidenavLayout);

const footerLayout = `
  <footer class="py-4 bg-light mt-auto">
    <div class="container-fluid px-4">
        <div class="d-flex align-items-center justify-content-between small">
            <div class="text-muted">Copyright &copy; CollabNote <span id="footerDate">YEAR</span></div>
            <div>
                <a href="#">Privacy Policy</a>
                &middot;
                <a href="#">Terms &amp; Conditions</a>
            </div>
        </div>
    </div>
  </footer>
`;

const initFooter = () => {
  document.querySelector("#layoutSidenav_content").innerHTML += footerLayout;
  const footerDate = document.body.querySelector("#footerDate");
  footerDate.textContent = new Date().getFullYear().toString();
};

const removeSpinner = () => {
  document.querySelector('#spinner').classList.add('d-none');
  const classList = document.querySelector('#layoutSidenav').classList;
  classList.remove('d-none');
  classList.add('d-flex');
}

const init = () => {
  initNavbar();
  initSidenav();
  initFooter();
  removeSpinner();
};

export default init;
