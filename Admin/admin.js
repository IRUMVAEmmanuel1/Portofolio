function toggleMenu() {
  const menu = document.querySelector('.sidebar');
  menu.classList.toggle('show-sidebar');
}

function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
      if (tab.id === tabName) {
          tab.style.display = 'block';
      } else {
          tab.style.display = 'none';
      }
  });
}
