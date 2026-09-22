const apiKey = "YOUR_API_KEY";
const lat = -20.15;
const lon = 28.58;

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
  const response = await fetch(url);
  const data = await response.json();

  document.querySelector("#temp").textContent =
    Math.round(data.list[0].main.temp);
  document.querySelector("#description").textContent =
    data.list[0].weather[0].description;

  // 3-day forecast (every 24 hours = 8 intervals)
  document.querySelector("#day1").textContent =
    Math.round(data.list[8].main.temp);
  document.querySelector("#day2").textContent =
    Math.round(data.list[16].main.temp);
  document.querySelector("#day3").textContent =
    Math.round(data.list[24].main.temp);
}

getWeather();
