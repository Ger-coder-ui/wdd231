// ========================================
// CONFIGURATION
// ========================================

const membersURL = "data/members.json";

// Harare coordinates
const latitude = -17.8252;
const longitude = 31.0335;

const apiKey = "9438462ae510af364f9ebe54c33df7b7";

const weatherURL =
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const forecastURL =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;


// ========================================
// FOOTER
// ========================================

document.querySelector("#year").textContent =
  new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  document.lastModified;


// ========================================
// MOBILE NAVIGATION
// ========================================

const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {

  navMenu.classList.toggle("open");

  const isOpen =
    navMenu.classList.contains("open");

  menuBtn.setAttribute(
    "aria-expanded",
    isOpen
  );

});


// ========================================
// WEATHER
// ========================================

async function getWeather() {

  try {

    const weatherResponse =
      await fetch(weatherURL);

    if (!weatherResponse.ok) {
      throw new Error(
        "Weather data could not be loaded."
      );
    }

    const weatherData =
      await weatherResponse.json();


    // Current temperature
    document.querySelector("#currentTemp").textContent =
      `${Math.round(weatherData.main.temp)}°C`;


    // Current conditions
    document.querySelector("#weatherDescription").textContent =
      weatherData.weather[0].description;


    // Get forecast
    const forecastResponse =
      await fetch(forecastURL);

    if (!forecastResponse.ok) {
      throw new Error(
        "Forecast data could not be loaded."
      );
    }

    const forecastData =
      await forecastResponse.json();


    displayForecast(forecastData);

  } catch (error) {

    console.error(error);

    document.querySelector("#currentTemp").textContent =
      "Weather unavailable";

    document.querySelector("#weatherDescription").textContent =
      "Unable to load weather data.";

    document.querySelector("#forecastContainer").textContent =
      "Forecast unavailable.";

  }

}


// ========================================
// THREE-DAY FORECAST
// ========================================

function displayForecast(data) {

  const container =
    document.querySelector("#forecastContainer");

  container.innerHTML = "";

  const dailyForecast = [];


  data.list.forEach(item => {

    const date =
      new Date(item.dt * 1000);

    const dateString =
      date.toLocaleDateString(
        "en-US",
        {
          weekday: "short",
          month: "short",
          day: "numeric"
        }
      );


    if (
      !dailyForecast.some(
        forecast =>
          forecast.date === dateString
      )
    ) {

      dailyForecast.push({

        date: dateString,

        temperature:
          item.main.temp

      });

    }

  });


  // Skip today's forecast and display
  // the next three days

  dailyForecast
    .slice(1, 4)
    .forEach(day => {

      const article =
        document.createElement("article");

      article.innerHTML = `
        <h4>${day.date}</h4>

        <p>
          ${Math.round(day.temperature)}°C
        </p>
      `;

      container.appendChild(article);

    });

}


// ========================================
// MEMBER SPOTLIGHTS
// ========================================

async function getSpotlights() {

  try {

    const response =
      await fetch(membersURL);

    if (!response.ok) {

      throw new Error(
        "Member data could not be loaded."
      );

    }

    const data =
      await response.json();


    // Only Gold and Silver members
    const qualifiedMembers = data.filter(member =>
      member.membership === "Gold" ||
      member.membership === "Silver"
    );

    // Randomize members
    const shuffled =
      [...qualifiedMembers]
        .sort(() => Math.random() - 0.5);


    // Select 2 or 3 members
    const numberToDisplay =
      Math.min(
        3,
        Math.max(2, shuffled.length)
      );

    const selectedMembers =
      shuffled.slice(
        0,
        numberToDisplay
      );


    displaySpotlights(selectedMembers);

  } catch (error) {

    console.error(error);

    document.querySelector(
      "#spotlightContainer"
    ).innerHTML =
      "<p>Member spotlights could not be loaded.</p>";

  }

}


// ========================================
// DISPLAY MEMBER SPOTLIGHTS
// ========================================

function displaySpotlights(members) {

  const container =
    document.querySelector(
      "#spotlightContainer"
    );

  container.innerHTML = "";


  members.forEach(member => {

    const card =
      document.createElement("article");

    card.classList.add(
      "spotlight-card"
    );


    card.innerHTML = `

      <img
        src="${member.image}"
        alt="${member.name} logo"
        loading="lazy"
      >

      <h3>
        ${member.name}
      </h3>

      <p>
        <strong>Membership:</strong>
        ${member.membership}
      </p>

      <p>
        <strong>Phone:</strong>
        ${member.phone}
      </p>

      <p>
        <strong>Address:</strong>
        ${member.address}
      </p>

      <p>
        <a
          href="${member.website}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
        </a>
      </p>

    `;

    container.appendChild(card);

  });

}


// ========================================
// RUN FUNCTIONS
// ========================================

getWeather();

getSpotlights();