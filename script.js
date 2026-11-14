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

document.querySelectorAll(".compare-table").forEach((container) => {
  const table = container.querySelector("table");
  const headers = Array.from(table.tHead.rows[0].cells, (cell) => cell.textContent.trim());
  const spans = [];
  const list = document.createElement("div");
  list.className = "mobile-table";

  Array.from(table.tBodies[0].rows).forEach((row) => {
    const fields = [];
    let column = 0;
    Array.from(row.cells).forEach((cell) => {
      while (spans[column]?.remaining > 0) {
        fields[column] = spans[column].cell;
        spans[column].remaining -= 1;
        column += 1;
      }
      fields[column] = cell;
      if (cell.rowSpan > 1) spans[column] = { cell, remaining: cell.rowSpan - 1 };
      column += 1;
    });
    const item = document.createElement("dl");
    fields.forEach((cell, index) => {
      if (cell.textContent.trim() === "--") return;
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = headers[index];
      Array.from(cell.childNodes).forEach((node) => description.appendChild(node.cloneNode(true)));
      item.append(term, description);
    });
    list.appendChild(item);
  });
  container.appendChild(list);
  container.classList.add("has-mobile-table");
});
