
// Get the current year
const currentYear = new Date().getFullYear();

// Display the current year in the footer
document.querySelector("#currentyear").textContent = currentYear;

// Display the date the document was last modified
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;
