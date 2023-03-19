const navigate = document.querySelector("button.menu-button");
const close = document.querySelector("button.menu__close");
const menu = document.getElementById("menu");

navigate.addEventListener("click", (e) => {
  console.log("Open menu");
  menu.setAttribute("class", "menu__content_open");
});

close.addEventListener("click", (e) => {
  console.log("Close menu");
  menu.setAttribute("class", "menu__content");
});
