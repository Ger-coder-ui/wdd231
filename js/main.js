// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Weather placeholder (Week 3+ you will expand this)
const weather = document.getElementById("weather");
if (weather) {
  weather.textContent = "72°F, Sunny";
}
