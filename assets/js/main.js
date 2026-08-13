// Akshara Charitable Trust — shared site behaviour

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Back-to-top button
  const toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener("scroll", () => {
      toTop.classList.toggle("show", window.scrollY > 480);
    });
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Current year in footer
  document.querySelectorAll(".cur-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Contact form: no backend wired up yet — hand off to email client.
  // TRUST_EMAIL is a placeholder; replace it with the Trust's real inbox before going live.
  const TRUST_EMAIL = "REPLACE-WITH-TRUST-EMAIL@example.org";
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#name")?.value.trim() || "";
      const email = form.querySelector("#email")?.value.trim() || "";
      const phone = form.querySelector("#phone")?.value.trim() || "";
      const subject = form.querySelector("#subject")?.value.trim() || "Website enquiry";
      const message = form.querySelector("#message")?.value.trim() || "";

      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      const mailto = `mailto:${TRUST_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
});
