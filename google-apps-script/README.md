# Google Sheet setup (volunteer registrations + donation records)

The website can't create a Google Sheet under your account for you — only you
can, since it needs to live in your own Google Drive so the Trust owns and
controls the data. This takes about 5 minutes, one time.

## 1. Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**.
2. Rename it something like "Akshara Charitable Trust — Website Data".

## 2. Add the script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete the placeholder `function myFunction() {}` code.
3. Paste in the entire contents of [`Code.gs`](./Code.gs) from this folder.
4. Click the **Save** icon (or Ctrl/Cmd+S).

## 3. Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Google will ask you to authorize the script — click through the consent
   screens (you'll see an "unverified app" warning since this is your own
   private script; click **Advanced → Go to (project name)** to proceed).
6. Copy the **Web app URL** shown (it ends in `/exec`).

## 4. Wire it into the site

Open `assets/js/gsheet-config.js` and replace the placeholder:

```js
const GSHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycb.../exec";
```

Commit and push — that's it. Volunteer registrations and (once Razorpay is
also configured) donation records will now append to two tabs in your Sheet,
**Volunteers** and **Donations**, created automatically the first time each
is used.

## 5. Test it

- Open the Web app URL directly in your browser — you should see
  `{"ok":true,"message":"Akshara Charitable Trust Sheet endpoint is live."}`.
- Submit the volunteer form on the live site and check a "Volunteers" tab
  appears in your Sheet with the entry.

## Updating the script later

If you ever edit `Code.gs` again, you need to **Deploy → Manage deployments
→ Edit (pencil icon) → New version → Deploy** for changes to take effect —
saving alone doesn't update a live Web app deployment.
