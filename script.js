const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navGroups = document.querySelectorAll(".nav-group");

const closeNavGroups = () => {
  navGroups.forEach((group) => {
    group.classList.remove("open");
    group.querySelector(".nav-menu-button")?.setAttribute("aria-expanded", "false");
  });
};

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  if (!isOpen) {
    closeNavGroups();
  }
});

nav?.addEventListener("click", (event) => {
  const menuButton = event.target.closest(".nav-menu-button");

  if (menuButton) {
    const group = menuButton.closest(".nav-group");
    const isOpen = group.classList.toggle("open");
    closeNavGroups();
    group.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    return;
  }

  if (event.target.tagName === "A") {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    closeNavGroups();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-nav")) {
    closeNavGroups();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavGroups();
    nav?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }
});
