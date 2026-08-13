// Akshara Charitable Trust — donation amount picker + Razorpay Checkout
//
// SETUP: paste your Razorpay Key ID below (Razorpay Dashboard → Settings →
// API Keys — use the "Key ID", e.g. "rzp_live_xxxxxxxxxxxx". Never paste the
// Key Secret here or anywhere in client-side code — it must stay private).
const RAZORPAY_KEY_ID = "REPLACE-WITH-YOUR-RAZORPAY-KEY-ID";

document.addEventListener("DOMContentLoaded", () => {
  const amountButtons = document.querySelectorAll("#amountGrid .amount-btn");
  const customInput = document.getElementById("customAmount");
  const customWrap = document.getElementById("customWrap");
  const donateBtn = document.getElementById("donateBtn");
  const amountError = document.getElementById("amountError");
  const notice = document.getElementById("donateSetupNotice");
  const successBox = document.getElementById("donateSuccess");
  if (!donateBtn) return;

  let selectedAmount = null;

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
      selectedAmount = Number(btn.dataset.amount);
      setLabel(selectedAmount);
      if (amountError) amountError.hidden = true;
    });
  });

  customInput.addEventListener("input", () => {
    amountButtons.forEach((b) => b.classList.remove("selected"));
    const val = customInput.value.trim();
    customWrap.classList.toggle("filled", val !== "");
    selectedAmount = val ? Number(val) : null;
    setLabel(val);
    if (amountError) amountError.hidden = true;
  });

  const isPlaceholder = () => /REPLACE-WITH/.test(RAZORPAY_KEY_ID);
  const sheetConfigured = () =>
    typeof GSHEET_WEBAPP_URL !== "undefined" && !/REPLACE-WITH/.test(GSHEET_WEBAPP_URL);

  donateBtn.addEventListener("click", () => {
    if (!selectedAmount || selectedAmount <= 0) {
      if (amountError) amountError.hidden = false;
      return;
    }
    if (amountError) amountError.hidden = true;

    if (isPlaceholder()) {
      if (notice) {
        notice.hidden = false;
        notice.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const donorName = document.getElementById("d-name")?.value || "";
    const donorEmail = document.getElementById("d-email")?.value || "";

    const rzp = new Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: selectedAmount * 100, // paise
      currency: "INR",
      name: "Akshara Charitable Trust",
      description: "Donation",
      prefill: { name: donorName, email: donorEmail },
      theme: { color: "#0f3d2e" },
      handler: function (response) {
        successBox.classList.add("show");
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });

        // Best-effort record into the Sheet's "Donations" tab, if configured.
        // Not required for the payment itself to succeed.
        if (sheetConfigured()) {
          fetch(GSHEET_WEBAPP_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
              type: "donation",
              name: donorName,
              email: donorEmail,
              amount: selectedAmount,
              paymentId: response.razorpay_payment_id || "",
            }),
          }).catch(() => {});
        }
      },
    });
    rzp.open();
  });
});
