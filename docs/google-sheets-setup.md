# Permanent, Free Google Sheets Storage Setup (Zero Inactivity Shutdown)

Traditional free cloud databases (like Supabase, Render, Neon free tier) will automatically pause or delete your database if no one visits the site for 7 to 30 days.

**Google Sheets has NO inactivity shutdown.**
A Google Sheet stored in your Google Drive will:
- Never pause, sleep, or shut down due to low website traffic
- Accept submissions immediately even if 0 visitors came for months
- Allow you to view all leads from your phone or PC
- Cost ₹0 forever

---

## 2-Minute Setup Instructions

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Name it **"Kairologic Website Enquiries"**.
3. In Row 1, add these headers in columns A through G:
   - **A1:** `Timestamp (IST)`
   - **B1:** `Name`
   - **C1:** `Email`
   - **D1:** `Organization`
   - **E1:** `Message`
   - **F1:** `Enquiry ID`
   - **G1:** `Raw ISO Time`

---

### Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions** in the top menu -> **Apps Script**.
2. Delete any code in the editor (`myFunction`), and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var payload = JSON.parse(e.postData.contents);

    sheet.appendRow([
      payload.formattedDate || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      payload.name || "",
      payload.email || "",
      payload.organisation || "",
      payload.message || "",
      payload.id || "",
      payload.timestamp || new Date().toISOString()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", id: payload.id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### Step 3: Deploy as Web App
1. At the top right of the Apps Script window, click **Deploy** -> **New deployment**.
2. Click the gear icon (**Select type**) next to "Deployment type" and choose **Web app**.
3. Configure the fields:
   - **Description:** `Kairologic Contact Form Webhook`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone` *(Important: Select "Anyone" so your website can post data to it)*.
4. Click **Deploy**.
5. Grant permissions if prompted (Click *Advanced* -> *Go to Untitled project (unsafe)* -> *Allow*).
6. Copy the **Web app URL** (it looks like: `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Step 4: Add to your Environment Variables
In your local `.env.local` or on your hosting provider (Vercel Project Settings -> Environment Variables):

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
```

That's it! Every time someone submits the contact form, a new row appears in your Google Sheet immediately.
