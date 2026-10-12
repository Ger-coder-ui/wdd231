import { setupNavigation, setupFooter } from "./navigation.js";

const featured = document.querySelector("#featuredExperiences");

async function getExperiences() {
  try {
    const response = await fetch("data/experiences.json");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Could not load experiences:", error);
    return [];
  }
}

function rememberPreferredExperience(experience) {
  localStorage.setItem("preferredExperience", JSON.stringify({
    name: experience.name,
    category: experience.category,
    savedAt: new Date().toISOString()
  }));
}

function createExperienceCard(experience) {
  return `
    <article class="service-card">
      <div class="icon" aria-hidden="true">✨</div>
      <span class="tag">${experience.category}</span>
      <h3>${experience.name}</h3>
      <p>${experience.description}</p>
      <p class="price">${experience.price}</p>
      <p class="mini-note">Typical duration: ${experience.duration}</p>
      <a class="button secondary" href="contact.html?eventType=${encodeURIComponent(experience.category)}" data-experience="${experience.name}">Enquire</a>
    </article>
  `;
}

async function displayFeatured() {
  if (!featured) return;
  const experiences = await getExperiences();
  const preferred = localStorage.getItem("preferredExperience");

  const selected = experiences.filter(item =>
    ["Picnic", "Décor", "Catering", "Gifts"].includes(item.category)
  ).slice(0, 4);

  featured.innerHTML = selected.map(createExperienceCard).join("");

  featured.querySelectorAll("[data-experience]").forEach(link => {
    link.addEventListener("click", () => {
      const item = experiences.find(exp => exp.name === link.dataset.experience);
      if (item) rememberPreferredExperience(item);
    });
  });

  if (preferred) {
    const saved = JSON.parse(preferred);
    const note = document.createElement("p");
    note.className = "mini-note";
    note.textContent = `Your saved interest: ${saved.name}.`;
    featured.parentElement.insertBefore(note, featured);
  }
}

setupNavigation();
setupFooter();
displayFeatured();
