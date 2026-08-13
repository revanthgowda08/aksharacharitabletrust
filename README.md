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
| `contact.html` | Address, phone, embedded map, contact form, donation guidance |

Shared styling lives in `assets/css/style.css`, shared behaviour (mobile nav, scroll reveal,
back-to-top, contact form) in `assets/js/main.js`, and the emblem in `assets/img/logo.svg`.

## Before going live

1. **Contact form email** — `assets/js/main.js` has a placeholder
   `TRUST_EMAIL = "REPLACE-WITH-TRUST-EMAIL@example.org"`. Update it to the Trust's real inbox
   (the form opens the visitor's email client rather than sending anything server-side).
2. **Trustee photographs** — `trustees.html` and the homepage currently show trustees' initials
   on a colored panel instead of photographs, since no image files were provided. Drop real
   photos into `assets/img/` (e.g. `trustee-rahul.jpg`, `trustee-anusha.jpg`) and swap the
   `<div class="trustee-photo">...</div>` blocks for an `<img>` tag.
3. **Official logo** — `assets/img/logo.svg` is an original emblem designed to match the
   description of the Trust's letterhead mark (tree, open book, laurel). Replace it with the
   Trust's actual logo file if one exists, keeping the same filename so it updates everywhere.
4. **Bank / donation details** — intentionally left off this site. Share payment details with
   donors individually (phone/email) rather than publishing an account number publicly.

## Running locally

No build tools needed — just serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying (GitHub Pages)

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`
   (or your default branch), folder `/ (root)`.
4. Save — the site will be published at `https://<username>.github.io/<repo-name>/`.

Any other static host (Netlify, Vercel, Firebase Hosting, plain Apache/Nginx) works too —
there is nothing to build, just upload the files as-is.
