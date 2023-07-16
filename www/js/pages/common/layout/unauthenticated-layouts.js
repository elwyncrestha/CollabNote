const footerLayout = `
  <div id="layoutAuthentication_footer">
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
  </div>
`;

const initFooter = () => {
  document.querySelector("#layoutAuthentication").innerHTML += footerLayout;
  const footerDate = document.body.querySelector("#footerDate");
  footerDate.textContent = new Date().getFullYear().toString();
};

const removeSpinner = () => {
  document.querySelector('#spinner').classList.add('d-none');
  const classList = document.querySelector('#layoutAuthentication').classList;
  classList.remove('d-none');
  classList.add('d-flex');
}

const init = () => {
  initFooter();
  removeSpinner();
};

export default init;
