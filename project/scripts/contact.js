import { setupNavigation, setupFooter } from "./navigation.js";

const form = document.querySelector("form");
const eventType = document.querySelector("#eventType");
const saved = localStorage.getItem("lastViewedExperience");

if (saved && eventType) {
  try {
    const item = JSON.parse(saved);
    const matchingOption = [...eventType.options].find(option => option.value === item.category);
    if (matchingOption) {
      eventType.value = item.category;
    }
  } catch (error) {
    console.warn("Saved experience could not be read.", error);
  }
}

form?.addEventListener("submit", () => {
  localStorage.setItem("lastEnquiryDate", new Date().toISOString());
});

setupNavigation();
setupFooter();