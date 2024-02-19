function toggleMenu() {
  var sideMenu = document.querySelector('.side-menu');
  sideMenu.style.display = (sideMenu.style.display === 'block') ? 'none' : 'block';
}

function showTab(tabId) {
  var tabs = document.querySelectorAll('.tab');
  for (var i = 0; i < tabs.length; i++) {
      tabs[i].style.display = 'none';
  }
  document.getElementById(tabId).style.display = 'block';
}

function showSubTab(subTabId) {
  var subTabs = document.querySelectorAll('.sub-tab');
  for (var i = 0; i < subTabs.length; i++) {
      subTabs[i].style.display = 'none';
  }
  document.getElementById(subTabId).style.display = 'block';
}
