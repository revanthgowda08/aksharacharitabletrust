# Akshara Charitable Trust — Website

A static, multi-page website for **Akshara Charitable Trust** (Reg. No. 946/2019-2020), a public
charitable trust based in Bangalore, Karnataka. Built with plain HTML, CSS and vanilla JS —
no build step, no framework, no dependencies to install.

## Pages

| Page | Content |
|---|---|
| `index.html` | Home — hero, mission overview, objective highlights, trustee preview, call to action |
| `about.html` | Registration & legal identity, registered office, founding trustee, governing clauses, financial management |
| `objectives.html` | All 25 objectives from Clause 6 of the Trust Deed, grouped by theme |
| `trustees.html` | Trustee profiles, board structure, trustee cessation conditions, deed witnesses |
| `initiatives.html` | Timeline and the Trust's 2023 land-request correspondence with Hosakote Taluk |
| `volunteer.html` | Volunteer registration form — writes to a Google Sheet |
| `donate.html` | Donation amount picker with Razorpay Checkout, plus a UPI fallback |
| `contact.html` | Address, phone, embedded map, contact form |

Shared styling lives in `assets/css/style.css`, shared behaviour (mobile nav, back-to-top,
contact form) in `assets/js/main.js`, and the logo in `assets/img/logo.png` /
`assets/img/favicon.png`.

## Before going live

1. **Contact form email** — `assets/js/main.js` has a placeholder
   `TRUST_EMAIL = "REPLACE-WITH-TRUST-EMAIL@example.org"`. Update it to the Trust's real inbox
   (the form opens the visitor's email client rather than sending anything server-side).
2. **Donations (Razorpay)** — `assets/js/donate.js` has a placeholder
   `RAZORPAY_KEY_ID = "REPLACE-WITH-YOUR-RAZORPAY-KEY-ID"`. Sign up at
   [razorpay.com](https://razorpay.com), complete KYC for the Trust, and paste your **Key ID**
   (Dashboard → Settings → API Keys) in — never the Key Secret, which must stay private and
   isn't needed for this simple client-side checkout flow. Also swap the placeholder UPI ID and
   QR image in `donate.html` once the Trust's bank account has UPI enabled.
3. **Volunteer registrations & donation records (Google Sheet)** — both forms post to one
   Google Apps Script Web App, configured in `assets/js/gsheet-config.js`
   (`GSHEET_WEBAPP_URL`). See `google-apps-script/README.md` for the one-time, ~5 minute setup —
   it walks through creating a Sheet, pasting in `google-apps-script/Code.gs`, and deploying it.
4. **Bank / donation details for offline giving** — intentionally left off this site. Share
   payment details with donors individually (phone/email) rather than publishing an account
   number publicly.

## Running locally

No build tools needed — just serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

This repo includes a minimal `package.json` (using the `serve` package) so platforms like
**Railway** can build and run it directly: `npm install && npm start`, binding to the
platform-provided `$PORT`.

Any static host works too, since there's nothing to build — GitHub Pages, Netlify, Vercel,
Firebase Hosting, or plain Apache/Nginx can all serve the files as-is.
