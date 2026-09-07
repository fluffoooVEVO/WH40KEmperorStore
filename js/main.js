document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
    const sidenavs = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavs);
});