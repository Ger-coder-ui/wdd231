
// Set the timestamp when the form page loads.
const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// Open membership dialogs.
const infoButtons = document.querySelectorAll(".info-button");

infoButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialogId = button.dataset.dialog;
        const dialog = document.getElementById(dialogId);

        if (dialog) {
            dialog.showModal();
        }
    });
});

// Close dialogs with their close buttons.
document.querySelectorAll(".close-dialog").forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});

// Close a dialog when clicking outside its content.
document.querySelectorAll(".membership-dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});

// Display the current year
const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Display the last modified date and time
const lastModifiedElement = document.querySelector("#lastModified");

if (lastModifiedElement) {
    const modifiedDate = new Date(document.lastModified);

    lastModifiedElement.textContent = modifiedDate.toLocaleString(
        "en-GB",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }
    );
}