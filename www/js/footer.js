export function initDate() {
  const footerDate = document.body.querySelector('#footerDate');
  footerDate.textContent = new Date().getFullYear();
}