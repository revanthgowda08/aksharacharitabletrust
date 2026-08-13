// Akshara Charitable Trust — volunteer registration
//
// Submits straight to a Google Form's response endpoint so entries land in
// the Google Sheet linked to that Form — no backend server required.
//
// SETUP: replace GOOGLE_FORM_ACTION and every entry.* ID below with the
// real ones from your own Google Form (Form → the three-dot menu →
// "Get pre-filled link", fill in dummy answers, then read the entry IDs
// out of the generated URL).

const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/REPLACE-WITH-YOUR-FORM-ID/formResponse";
const FIELD_ENTRIES = {
  name: "entry.100000001",
  phone: "entry.100000002",
  email: "entry.100000003",
  city: "entry.100000004",
  interests: "entry.100000005",
  availability: "entry.100000006",
  message: "entry.100000007",
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("volunteerForm");
  if (!form) return;

  const submitBtn = document.getElementById("v-submit");
  const successBox = document.getElementById("v-success");
  const errorBox = document.getElementById("v-error");
  const notice = document.getElementById("volunteerSetupNotice");

  const isPlaceholder = /REPLACE-WITH/.test(GOOGLE_FORM_ACTION) ||
    Object.values(FIELD_ENTRIES).some((v) => v.startsWith("entry.100000"));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successBox.classList.remove("show");
    errorBox.classList.remove("show");

    if (isPlaceholder) {
      if (notice) {
        notice.hidden = false;
        notice.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const interests = Array.from(
      form.querySelectorAll('input[name="interest"]:checked')
    ).map((el) => el.value);

    const payload = new URLSearchParams();
    payload.append(FIELD_ENTRIES.name, document.getElementById("v-name").value);
    payload.append(FIELD_ENTRIES.phone, document.getElementById("v-phone").value);
    payload.append(FIELD_ENTRIES.email, document.getElementById("v-email").value);
    payload.append(FIELD_ENTRIES.city, document.getElementById("v-city").value);
    payload.append(FIELD_ENTRIES.interests, interests.join(", "));
    payload.append(FIELD_ENTRIES.availability, document.getElementById("v-availability").value);
    payload.append(FIELD_ENTRIES.message, document.getElementById("v-message").value);

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    // Google's form endpoint doesn't send CORS headers, so the response is
    // opaque either way (mode: "no-cors") — we can't read a real success/
    // failure status back. We optimistically show success once the request
    // is dispatched; verify entries are landing in your Sheet after setup.
    fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
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
