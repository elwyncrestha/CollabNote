import { DataTable } from 'simple-datatables';

window.addEventListener('DOMContentLoaded', () => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new DataTable(datatablesSimple);
    }
    
    // SB Admin template CSS had very tight coupling with Bootstrap CSS.
    // Had to remove Bootstrap CSS from SB Admin template CSS.
    // And, add a Bootstrap (from `package.json`) class to Simple DataTables elements.
    const elementList = [
        { selector: '.datatable-selector', classList: ['form-select'] },
        { selector: '.datatable-input', classList: ['form-control'] },
        { selector: '.datatable-wrapper .datatable-container', classList: ['table-responsive'] },
        { selector: '.datatable-table', classList: ['table'] },
    ];
    elementList.forEach(({ selector, classList }) => {
        const datatableSelectors = document.querySelectorAll(selector);
        datatableSelectors.forEach((selector) => selector.classList.add(...classList));    
    })
    
});
