import { setupNavigation, setupFooter } from "./navigation.js";

const grid = document.querySelector("#experienceGrid");
const filters = document.querySelector("#filters");
const modal = document.querySelector("#experienceModal");
const modalTitle = document.querySelector("#modalTitle");
const modalContent = document.querySelector("#modalContent");
const modalClose = document.querySelector("#modalClose");

let experiences = [];
let activeCategory = "All";

async function loadExperiences() {
  try {
    const response = await fetch("data/experiences.json");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    experiences = await response.json();
    buildFilters();
    renderExperiences(experiences);
  } catch (error) {
    console.error("Experience data could not be loaded:", error);
    grid.innerHTML = `<div class="notice"><strong>Sorry.</strong> We could not load the experiences right now. Please try again.</div>`;
  }
}

function buildFilters() {
  const categories = ["All", ...new Set(experiences.map(item => item.category))];
  filters.innerHTML = categories.map(category => `
    <button class="filter-button ${category === "All" ? "active" : ""}" type="button" data-category="${category}">
      ${category}
    </button>
  `).join("");

  filters.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      filters.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filtered = activeCategory === "All"
        ? experiences
        : experiences.filter(item => item.category === activeCategory);
      renderExperiences(filtered);
    });
  });
}

function imageForExperience(item) {
  return item.id % 2 === 0 ? "images/heavenly-flyer-2.jpeg" : "images/heavenly-flyer-1.jpeg";
}

function renderExperiences(items) {
  if (!items.length) {
    grid.innerHTML = `<p>No experiences found in this category.</p>`;
    return;
  }

  grid.innerHTML = items.map(item => `
    <article class="service-card experience-card">
      <img class="experience-image" src="${imageForExperience(item)}" alt="${item.name} promotional image" loading="lazy" width="1200" height="1600">
      <div class="experience-body">
        <span class="tag">${item.category}</span>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong class="price">${item.price}</strong> · ${item.duration}</p>
        <div class="card-actions">
          <button class="small-button details-button" type="button" data-id="${item.id}">View details</button>
          <a class="small-button" href="contact.html?eventType=${encodeURIComponent(item.category)}">Enquire</a>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".details-button").forEach(button => {
    button.addEventListener("click", () => openExperience(Number(button.dataset.id)));
  });
}

function openExperience(id) {
  const item = experiences.find(experience => experience.id === id);
  if (!item) return;

  localStorage.setItem("lastViewedExperience", JSON.stringify(item));
  modalTitle.textContent = item.name;
  modalContent.innerHTML = `
    <p class="tag">${item.category}</p>
    <p>${item.description}</p>
    <dl class="summary-list">
      <div><dt>Package price</dt><dd>${item.price}</dd></div>
      <div><dt>Typical duration</dt><dd>${item.duration}</dd></div>
      <div><dt>Category</dt><dd>${item.category}</dd></div>
      <div><dt>Experience</dt><dd>${item.name}</dd></div>
    </dl>
    <a class="button" href="contact.html?eventType=${encodeURIComponent(item.category)}">Ask about this experience</a>
  `;
  modal.showModal();
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeModal() {
  modal.close();
  document.body.classList.remove("modal-open");
}

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
modal?.addEventListener("cancel", () => document.body.classList.remove("modal-open"));

document.querySelectorAll("[data-gallery-title]").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.galleryTitle;
    modalContent.innerHTML = `
      <img src="${card.dataset.galleryImage}" alt="${card.dataset.galleryTitle}" style="border-radius:14px; margin-bottom:1rem;" width="1200" height="1600">
      <p>${card.dataset.galleryDescription}</p>
    `;
    modal.showModal();
    document.body.classList.add("modal-open");
    modalClose.focus();
  });
});

setupNavigation();
setupFooter();
loadExperiences();
