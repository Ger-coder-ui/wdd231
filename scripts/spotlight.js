const spotlightContainer = document.querySelector("#spotlight-container");
const membersURL = "data/member.json";

async function getSpotlights() {
  const response = await fetch(membersURL);
  const data = await response.json();

  const qualified = data.members.filter(
    member => member.membership === "Gold" || member.membership === "Silver"
  );

  const randomMembers = qualified
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  randomMembers.forEach(member => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/logos/${member.logo}" alt="${member.name} logo">
      <h4>${member.name}</h4>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="level">${member.membership} Member</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();
