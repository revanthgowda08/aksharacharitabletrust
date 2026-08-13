// Akshara Charitable Trust — volunteer registration
//
// Submits to the shared Google Apps Script Web App (see gsheet-config.js /
// google-apps-script/) which appends the entry to a "Volunteers" tab in a
// Google Sheet — no backend server required.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("volunteerForm");
  if (!form) return;

  const submitBtn = document.getElementById("v-submit");
  const successBox = document.getElementById("v-success");
  const errorBox = document.getElementById("v-error");
  const notice = document.getElementById("volunteerSetupNotice");

  const isPlaceholder = () =>
    typeof GSHEET_WEBAPP_URL === "undefined" || /REPLACE-WITH/.test(GSHEET_WEBAPP_URL);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successBox.classList.remove("show");
    errorBox.classList.remove("show");

    if (isPlaceholder()) {
      if (notice) {
        notice.hidden = false;
        notice.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const interests = Array.from(
      form.querySelectorAll('input[name="interest"]:checked')
    ).map((el) => el.value);

    const payload = {
      type: "volunteer",
      name: document.getElementById("v-name").value,
      phone: document.getElementById("v-phone").value,
      email: document.getElementById("v-email").value,
      city: document.getElementById("v-city").value,
      interests: interests,
      availability: document.getElementById("v-availability").value,
      message: document.getElementById("v-message").value,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    // Apps Script Web Apps don't return browser-readable CORS headers, so
    // the response is opaque either way (mode: "no-cors") — we can't read a
    // real success/failure status back. We optimistically show success once
    // the request is dispatched; verify entries are landing in your Sheet
    // after setup (see google-apps-script/README.md, step 5).
    fetch(GSHEET_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    })
      .then(() => {
        successBox.classList.add("show");
        form.reset();
      })
      .catch(() => {
        errorBox.classList.add("show");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Registration";
      });
  });
});
