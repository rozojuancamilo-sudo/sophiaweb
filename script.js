const products = ["Bread", "Pastries", "Cakes"];
const storageKey = "bakeryFavorite";

// Fill the dropdown with the products.
function addProducts(select) {
  products.forEach(function (product) {
    const option = document.createElement("option");
    option.value = product;
    option.textContent = product;
    select.appendChild(option);
  });
}

// Bring back the favorite
function loadFavorite(select, message) {
  const saved = sessionStorage.getItem(storageKey);
  if (products.includes(saved)) {
    select.value = saved;
    message.textContent = "Your saved favorite: " + saved;
  }
}

// Save the choice when the button is clicked.
function saveFavorite(select, message) {
  const choice = select.value;
  if (!products.includes(choice)) {
    message.textContent = "Please choose a product first.";
    return;
  }
  sessionStorage.setItem(storageKey, choice);
  message.textContent = "Your favorite is now: " + choice;
}

// Set up the favorites area if this is the products page.
function setupFavorites() {
  const select = document.getElementById("favorite-product");
  if (!select) return;

  const message = document.getElementById("favorite-message");
  const button = document.getElementById("save-favorite");
  addProducts(select);
  loadFavorite(select, message);
  button.addEventListener("click", function () {
    saveFavorite(select, message);
  });
}

// Put an error right below the  field.
function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  document.getElementById(errorId).textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

// Check the form and keep the answers if something is wrong.
function validateForm(formData) {
  let valid = true;
  const checks = [
    {
      field: "customer-name",
      error: "name-error",
      message: formData.name.length < 2 ? "Please enter at least 2 characters for your name." : ""
    },
    {
      field: "email",
      error: "email-error",
      message: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "" : "Please enter a valid email address."
    },
    {
      field: "request-type",
      error: "request-error",
      message: formData.type ? "" : "Please choose a request type."
    },
    {
      field: "item-details",
      error: "details-error",
      message: formData.details.length < 10 ? "Please enter at least 10 characters in request details." : ""
    }
  ];

  checks.forEach(function (check) {
    showError(check.field, check.error, check.message);
    if (check.message) valid = false;
  });
  return valid;
}

// Show a thank you. This, of course, does not really work
function submitDemo(event) {
  event.preventDefault();
  const formData = {
    name: document.getElementById("customer-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    type: document.getElementById("request-type").value,
    details: document.getElementById("item-details").value.trim()
  };
  const message = document.getElementById("form-message");
  message.textContent = "";

  if (!validateForm(formData)) return;

  const requestName = formData.type === "preorder" ? "preorder" : "general question";
  message.textContent = "Thank you, " + formData.name + "! Your " + requestName +
    " is ready. This is a demonstration, and nothing was sent.";
}

// Set up the form if this is the contact page.
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (form) form.addEventListener("submit", submitDemo);
}

setupFavorites();
setupContactForm();
