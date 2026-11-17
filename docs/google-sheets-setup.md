# Permanent, Free Google Sheets Storage Setup (Zero Inactivity Shutdown)

Traditional free cloud databases (like Supabase, Render, Neon free tier) will automatically pause or delete your database if no one visits the site for 7 to 30 days.

**Google Sheets has NO inactivity shutdown.**
A Google Sheet stored in your Google Drive will:
- Never pause, sleep, or shut down due to low website traffic
- Accept submissions immediately even if 0 visitors came for months
- Allow you to view all leads from your phone or PC
- Cost ₹0 forever

---

## Bulletproof Setup Instructions

### Step 1: Your Spreadsheet Headers
In your Google Sheet **"Kairologic Website Enquiries"** (ID: `1VZQPRn3ItJf34mKX6ORw79bi3-VT29jarmbyQbPubBY`):
Make sure the tab at the bottom is named **`Sheet1`**, and Row 1 has these headers:
- **A1:** `Timestamp (IST)`
- **B1:** `Name`
- **C1:** `Email`
- **D1:** `Organization`
- **E1:** `Message`
- **F1:** `Enquiry ID`
- **G1:** `Raw ISO Time`

---

### Step 2: Paste the Apps Script
1. In your Google Sheet, click **Extensions** in the top menu -> **Apps Script**.
2. Replace everything in the code editor with this exact script:

```javascript
function doPost(e) {
  return handleEnquiry(e);
}

function doGet(e) {
  return handleEnquiry(e);
}

function handleEnquiry(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    // Targets your exact spreadsheet and Sheet1 tab
    var SPREADSHEET_ID = "1VZQPRn3ItJf34mKX6ORw79bi3-VT29jarmbyQbPubBY";
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var formattedDate = data.formattedDate || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.name || "";
    var email = data.email || "";
    var organisation = data.organisation || "";
    var message = data.message || "";
    var id = data.id || "";
    var timestamp = data.timestamp || new Date().toISOString();

    sheet.appendRow([
      formattedDate,
      name,
      email,
      organisation,
      message,
      id,
      timestamp
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", id: id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Click the **Save** icon (disk icon) in the toolbar.

---

### Step 3: Deploy as Web App (CRITICAL SETTINGS)
1. At the top right of the Apps Script window, click **Deploy** -> **Manage deployments** (or **New deployment**).
2. If editing an existing deployment, click the **Pencil icon (Edit)**:
   - **Version:** Click the dropdown and select **New version** *(Essential: Apps Script freezes code until you pick "New version")*.
   - **Execute as:** `Me (your email)`
   - **Who has access:** MUST be **`Anyone`** *(CRITICAL: If set to "Only myself", external server posts are blocked!)*
3. Click **Deploy**.
4. If Google shows an authorization popup:
   - Click **Review permissions** -> Choose your account.
   - Click **Advanced** (in small grey text) -> Click **Go to Untitled project (unsafe)** -> Click **Allow**.
5. Copy the **Web app URL** that ends with **`/exec`** (Do NOT use the `/dev` URL).
   - Format: `https://script.google.com/macros/s/AKfycb.../exec`

---

### Step 4: Verify Your Vercel Environment Variable
In your Vercel Project Settings -> **Environment Variables**:
- Variable Name: `GOOGLE_SHEETS_WEBHOOK_URL`
- Value: The URL copied above (ending in `/exec`).
- Ensure the **Production** checkbox is checked!
- If you updated it, trigger a **Redeploy** on Vercel so the server loads it.
