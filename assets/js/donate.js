// Akshara Charitable Trust — donation amount picker

document.addEventListener("DOMContentLoaded", () => {
  const amountButtons = document.querySelectorAll("#amountGrid .amount-btn");
  const customInput = document.getElementById("customAmount");
  const customWrap = document.getElementById("customWrap");
  const donateBtn = document.getElementById("donateBtn");
  if (!donateBtn) return;

  function setLabel(amount) {
    donateBtn.textContent = amount
      ? `Donate ₹${Number(amount).toLocaleString("en-IN")} Now — Secure Checkout`
      : "Donate Now — Secure Checkout";
  }

  amountButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      amountButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      customWrap.classList.remove("filled");
      customInput.value = "";
      setLabel(btn.dataset.amount);
    });
  });

  customInput.addEventListener("input", () => {
    amountButtons.forEach((b) => b.classList.remove("selected"));
    customWrap.classList.toggle("filled", customInput.value.trim() !== "");
    setLabel(customInput.value.trim());
  });

  // Placeholder-detection: show the dev-facing setup notice, and stop the
  // click, only while the payment link hasn't been configured yet.
  const notice = document.getElementById("donateSetupNotice");
  const isPlaceholder = /REPLACE-WITH/.test(donateBtn.getAttribute("href") || "");
  if (isPlaceholder) {
    if (notice) notice.hidden = false;
    donateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (notice) notice.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
});
