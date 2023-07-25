import { MenuButtonLinks } from "./scripts/wai-aria-menu.js";

function openMenu(menuContainer) {
  menuContainer.classList.remove("menu_closed");
  menuContainer.classList.add("menu_opened");
}

function closeMenu(menuContainer) {
  menuContainer.classList.remove("menu_opened");
  menuContainer.classList.add("menu_closed");
}

const style = getComputedStyle(document.body);
let breakpointS = parseInt(style.getPropertyValue("--breakpoint-s"));
breakpointS = !Number.isNaN(breakpointS) ? breakpointS : 650;
const mediaQueryS = window.matchMedia(`(max-width: ${breakpointS}px)`);

// Change tabindices for burger menu.
mediaQueryS.addEventListener("change", (event) => {
  let menuitemNodes = document.querySelectorAll(".menu__link");
  if (event.matches) {
    menuitemNodes.forEach((element) => (element.tabIndex = -1));
  } else {
    menuitemNodes.forEach((element) => (element.tabIndex = 0));
  }
});

const nav = document.querySelector(".nav");
const menu = new MenuButtonLinks(nav, openMenu, closeMenu);

// Initialize menu button
if (window.innerWidth <= breakpointS) {
  if (!menu.events) {
    menu.addEvents();
  }
}

mediaQueryS.addEventListener("change", (event) => {
  if (event.matches) {
    if (!menu.events) {
      menu.addEvents();
    }
  } else {
    menu.removeEvents();
  }
});

// Close the menu if the width of the window is more than breakpoint (650px).
mediaQueryS.addEventListener("change", (event) => {
  if (!event.matches) {
    menu.closePopup();
  }
});

// Change tabindices for burger menu if current width is less than breakpoint (650px).
let menuitemNodes = document.querySelectorAll(".menu__link");

if (window.innerWidth <= breakpointS) {
  menuitemNodes.forEach((element) => (element.tabIndex = -1));
} else {
  menuitemNodes.forEach((element) => (element.tabIndex = 0));
}
