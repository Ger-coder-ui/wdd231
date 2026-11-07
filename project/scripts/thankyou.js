import { setupNavigation, setupFooter } from "./navigation.js";

const summary = document.querySelector("#submissionSummary");
const params = new URLSearchParams(window.location.search);

const fields = [
  ["Name", "name"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["Event", "eventType"],
  ["Contact method", "contactMethod"],
  ["Preferred date", "date"],
  ["Guests", "guests"],
  ["Message", "message"],
  ["Updates requested", "updates"]
];

const escapeHtml = value => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const submittedFields = fields
  .map(([label, key]) => [label, params.get(key)])
  .filter(([, value]) => value);

if (submittedFields.length) {
  summary.innerHTML = submittedFields.map(([label, value]) => `
    <div>
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value)}</dd>
    </div>
  `).join("");
} else {
  summary.innerHTML = `
    <div>
      <dt>No enquiry details found</dt>
      <dd>Please return to the booking page and submit the form.</dd>
    </div>
  `;
}

setupNavigation();
setupFooter();
