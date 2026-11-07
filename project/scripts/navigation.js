export function setupNavigation() {
  const button = document.querySelector("#menuBtn");
  const nav = document.querySelector("#primaryNav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    button.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation");
      button.textContent = "☰";
    });
  });

  const currentPage = location.pathname.split("/").pop() || "index.html";
  nav.querySelectorAll("a[data-page]").forEach(link => {
    const page = link.dataset.page;
    const matches = (page === "index" && currentPage === "index.html") ||
                    (page === "services" && currentPage === "services.html") ||
                    (page === "contact" && currentPage === "contact.html");
    if (matches) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

export function setupFooter() {
  const year = document.querySelector("#currentYear");
  const modified = document.querySelector("#lastModified");
  if (year) year.textContent = new Date().getFullYear();
  if (modified) modified.textContent = document.lastModified;
}
