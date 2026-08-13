/**
 * Akshara Charitable Trust — Google Sheet backend for the website.
 *
 * Receives volunteer registrations and donation records from the website
 * (assets/js/volunteer.js and assets/js/donate.js) and appends them to this
 * spreadsheet, creating "Volunteers" and "Donations" tabs (with headers) the
 * first time each is used.
 *
 * SETUP — see README.md in this folder for the full walkthrough:
 *   1. Create a new Google Sheet.
 *   2. Extensions > Apps Script, delete the placeholder code, paste this file in.
 *   3. Deploy > New deployment > Web app.
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   4. Copy the Web app URL (ends in /exec) into
 *      assets/js/gsheet-config.js as GSHEET_WEBAPP_URL.
 */

function doPost(e) {
  var result = { ok: true };
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var isDonation = data.type === "donation";
    var sheetName = isDonation ? "Donations" : "Volunteers";
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = isDonation
        ? ["Timestamp", "Name", "Email", "Amount (INR)", "Razorpay Payment ID"]
        : ["Timestamp", "Name", "Phone", "Email", "City", "Interests", "Availability", "Message"];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var timestamp = new Date();
    if (isDonation) {
      sheet.appendRow([
        timestamp,
        data.name || "",
        data.email || "",
        data.amount || "",
        data.paymentId || "",
      ]);
    } else {
      sheet.appendRow([
        timestamp,
        data.name || "",
        data.phone || "",
        data.email || "",
        data.city || "",
        Array.isArray(data.interests) ? data.interests.join(", ") : (data.interests || ""),
        data.availability || "",
        data.message || "",
      ]);
    }
  } catch (err) {
    result = { ok: false, error: String(err) };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Lets you sanity-check the deployment URL by opening it directly in a browser.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "Akshara Charitable Trust Sheet endpoint is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}
