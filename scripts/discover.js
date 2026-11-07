const visitMessage = document.getElementById("visit-message");

// localStorage visit tracking
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysBetween = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));

  if (daysBetween < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else {
    visitMessage.textContent = `You last visited ${daysBetween} day(s) ago.`;
  }
}

localStorage.setItem("lastVisit", currentVisit);

// Fetch JSON
fetch("data/places.json")
  .then(response => response.json())
  .then(data => displayCards(data));

function displayCards(data) {
  const container = document.querySelector(".discover-grid");

  data.forEach(place => {
    const card = document.createElement("section");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.name;
    img.loading = "lazy";

    const title = document.createElement("h2");
    title.textContent = place.name;

    const address = document.createElement("p");
    address.classList.add("address");
    address.textContent = place.address;

    const desc = document.createElement("p");
    desc.classList.add("description");
    desc.textContent = place.description;

    const button = document.createElement("button");
    button.textContent = "Learn More";

    card.append(img, title, address, desc, button);
    container.appendChild(card);
  });
}

// Responsive menu
const menuButton = document.getElementById("menu-button");
const navList = document.getElementById("nav-list");

menuButton.addEventListener("click", () => {
  navList.classList.toggle("open");
});

