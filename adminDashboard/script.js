const sidebar = document.querySelector(".sidebar");
const menu = document.querySelector("#menu");

const main = document.querySelector(".main");

const menu_container = document.querySelector(".menu-container");
const logout_container = document.querySelector(".logout-container");

const icon_logout = document.querySelector(".icon-logout");

// const search = document.querySelector("#search");
const dashboard = document.querySelector("#dashboard");
const article = document.querySelector("#article");
const clients = document.querySelector("#clients");
const vets = document.querySelector("#vets");
const settings = document.querySelector("#settings");

let previousToggled = null;
let currentToggled = null;

// search.addEventListener("click", (e) => {
//   toggleMenu(search);
// });

dashboard.addEventListener("click", (e) => {
  toggleMenu(dashboard);
});

article.addEventListener("click", (e) => {
  toggleMenu(article);
});

clients.addEventListener("click", (e) => {
  toggleMenu(clients);
});

vets.addEventListener("click", (e) => {
  toggleMenu(vets);
});

settings.addEventListener("click", (e) => {
  toggleMenu(settings);
});

const toggleMenu = (button) => {
  if (previousToggled && button !== menu) {
    untoggleMenu(previousToggled);
  }

  button.classList.add("toggled");
  button.style.backgroundColor = "#8ed7c6";

  if (button !== menu) {
    previousToggled = button;
  }
};

const untoggleMenu = (button) => {
  button.classList.remove("toggled");
  button.style.backgroundColor = "#18c29c";
};

menu.addEventListener("click", (e) => {
  sidebar.classList.contains("active") ? closeMenu() : openMenu();
});

const openMenu = () => {
  sidebar.classList.add("active");
  sidebar.style.width = "250px";

  toggleMenu(menu);

  let menu_logo = document.createElement("img");
  menu_logo.id = "menu-logo";
  menu_logo.src = "../images/MineLogo-removebg-preview.png";
  menu_logo.style.width = "45";
  menu_logo.style.height = "45px"
  menu_container.style.paddingLeft = "15px";
  menu_container.insertBefore(menu_logo, menu_container.childNodes[0]);
  let p_dash = document.createElement("p");
  p_dash.id = "p-dashboard";
  p_dash.innerHTML = "Dashboard";
  dashboard.style.width = "220px";
  dashboard.style.justifyContent = "left";
  dashboard.appendChild(p_dash);

  let p_article = document.createElement("p");
  p_article.id = "p-article";
  p_article.innerHTML = "Article";
  article.style.width = "220px";
  article.style.justifyContent = "left";
  article.appendChild(p_article);

  let p_clients = document.createElement("p");
  p_clients.id = "p-clients";
  p_clients.innerHTML = "Users";
  clients.style.width = "220px";
  clients.style.justifyContent = "left";
  clients.appendChild(p_clients);

  let p_vets = document.createElement("p");
  p_vets.id = "p-vets";
  p_vets.innerHTML = "Message";
  vets.style.width = "220px";
  vets.style.justifyContent = "left";
  vets.appendChild(p_vets);

  let p_settings = document.createElement("p");
  p_settings.id = "p-settings";
  p_settings.innerHTML = "All Articles";
  settings.style.width = "220px";
  settings.style.justifyContent = "left";
  settings.appendChild(p_settings);

  icon_logout.style.width = "25%";

  let user_container = document.createElement("div");
  user_container.id = "user-container";

  let user_name = document.createElement("p");
  user_name.id = "user-name";
  user_name.innerHTML = "Irumva";

  let user_role = document.createElement("p");
  user_role.id = "user-role";
  user_role.innerHTML = "Admin";

  user_container.appendChild(user_name);
  user_container.appendChild(user_role);

  logout_container.insertBefore(user_container, logout_container.childNodes[0]);

  let logout_photo = document.createElement("img");
  logout_photo.id = "logout-photo";
  logout_photo.src = "../images/profile-pic-removebg (1) (1).png";
  logout_container.style.paddingLeft = "15px";
  logout_container.insertBefore(logout_photo, logout_container.childNodes[0]);

  main.style.width = "calc(100% - 250px)";
};

const closeMenu = () => {
  menu_container.removeChild(document.getElementById("menu-logo"));
  menu_container.style.paddingLeft = "0px";

  untoggleMenu(menu);

  // search.removeChild(document.getElementById("p-search"));
  // search.style.width = "50px";
  // search.style.justifyContent = "center";

  dashboard.removeChild(document.getElementById("p-dashboard"));
  dashboard.style.width = "50px";
  dashboard.style.justifyContent = "center";

  article.removeChild(document.getElementById("p-article"));
  article.style.width = "50px";
  article.style.justifyContent = "center";

  clients.removeChild(document.getElementById("p-clients"));
  clients.style.width = "50px";
  clients.style.justifyContent = "center";

  vets.removeChild(document.getElementById("p-vets"));
  vets.style.width = "50px";
  vets.style.justifyContent = "center";

  settings.removeChild(document.getElementById("p-settings"));
  settings.style.width = "50px";
  settings.style.justifyContent = "center";

  logout_container.removeChild(document.getElementById("logout-photo"));
  logout_container.removeChild(document.getElementById("user-container"));
  logout_container.style.paddingLeft = "0px";

  icon_logout.style.width = "100%";

  sidebar.classList.remove("active");
  sidebar.style.width = "78px";

  main.style.width = "calc(100% - 78px)";
};
