# Booking website setup

The website now includes fields for **Name, Email ID, Phone number, Service, Date, Time, Location**, and optional additional details. Submissions are emailed to the configured business inbox, and a receipt is sent to the customer using Google Apps Script. Optional Google Sheets logging is included.

## 1. Set the website details
In `script.js`, update `BUSINESS_NAME`, `CONTACT_EMAIL`, and eventually `GOOGLE_SCRIPT_URL`.

## 2. Create the Google email handler
1. Visit https://script.google.com and create a new project.
2. Copy all code from `google-apps-script.gs` into `Code.gs`.
3. Replace `your-email@example.com` in `OWNER_EMAIL` with the inbox that should receive bookings.
4. Optional: create a Google Sheet and put its ID into `SPREADSHEET_ID` (the ID is between `/d/` and `/edit` in the URL).
5. Save. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Deploy and authorize it.
6. Copy the web app URL ending in `/exec`.

## 3. Connect and test
Paste the real `/exec` URL into `GOOGLE_SCRIPT_URL` in `script.js`. Save and publish the updated files. Submit a test booking and check both the owner inbox and customer inbox (including spam). The Apps Script sends email from the Google account that deployed it.

## 4. Free hosting
Upload `index.html`, `style.css`, and `script.js` to a GitHub repository. In **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, and save. The Apps Script file is copied into the Google Apps Script editor, not run as a website file.

## Important
- A public Apps Script endpoint can receive spam. Do not collect sensitive information; add abuse protection before broad public use.
- The website uses Google Apps Script for the custom form interface, rather than embedding Google Forms. This allows the form to match the site's design.
- The email confirms receipt only. Confirm availability separately before treating a booking as final.
