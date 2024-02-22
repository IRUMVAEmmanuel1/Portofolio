function toggleMenu() {
  var sideMenu = document.querySelector('.side-menu');
  sideMenu.classList.toggle('active');
}

function showTab(tabId) {
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
      tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

function showSubTab(subTabId) {
  var subTabs = document.querySelectorAll('.sub-tab');
  subTabs.forEach(subTab => {
      subTab.style.display = 'none';
  });
  document.getElementById(subTabId).style.display = 'block';
}
