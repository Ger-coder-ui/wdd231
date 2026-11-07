
const params = new URLSearchParams(window.location.search);

function displayValue(elementId, parameterName) {
    const element = document.getElementById(elementId);
    const value = params.get(parameterName);

    if (element) {
        element.textContent = value || "Not provided";
    }
}

displayValue("displayFirstName", "firstName");
displayValue("displayLastName", "lastName");
displayValue("displayEmail", "email");
displayValue("displayPhone", "phone");
displayValue("displayBusiness", "business");

const timestamp = params.get("timestamp");
const timestampElement = document.getElementById("displayTimestamp");

if (timestampElement) {
    const date = new Date(timestamp);

    timestampElement.textContent =
        timestamp && !Number.isNaN(date.getTime())
            ? date.toLocaleString()
            : "Not available";
}

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