const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");
const menuButton = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Could not load member data.");
    }

    const members = await response.json();

    displayMembers(members);
  } catch (error) {
    console.error(error);
    membersContainer.innerHTML =
      "<p>Sorry, the member directory could not be loaded.</p>";
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");

    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" 
           alt="${member.name} logo" 
           loading="lazy">

      <div class="member-info">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p>Membership: ${member.membership}</p>
        <a href="${member.website}" 
           target="_blank" 
           rel="noopener noreferrer">
           Visit Website
        </a>
      </div>
    `;

    membersContainer.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  const isOpen = navMenu.classList.contains("open");

  menuButton.setAttribute("aria-expanded", isOpen);
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  document.lastModified;

getMembers();
