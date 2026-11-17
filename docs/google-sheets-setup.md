# Permanent, Free Google Sheets Storage Setup (Zero Inactivity Shutdown)

Traditional free cloud databases (like Supabase, Render, Neon free tier) will automatically pause or delete your database if no one visits the site for 7 to 30 days.

**Google Sheets has NO inactivity shutdown.**
A Google Sheet stored in your Google Drive will:
- Never pause, sleep, or shut down due to low website traffic
- Accept submissions immediately even if 0 visitors came for months
- Allow you to view all leads from your phone or PC
- Cost ₹0 forever

---

## The Exact Apps Script Code

In your Google Sheet **"Kairologic Website Enquiries"**:
1. Click **Extensions** in the top menu -> **Apps Script**.
2. Replace all code with this:

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

    // 1. Tries the container spreadsheet directly
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 2. If running standalone, opens via your exact spreadsheet URL (no ID typos)
    if (!ss) {
      ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1VZQPRn3ltJf34mKX6ORw79bi3-VT29jarmbyQbPubBY/edit");
    }

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

3. Click **Save** (disk icon).

---

## Deploying the Update
1. Click **Deploy** -> **Manage deployments**.
2. Click the **Pencil (Edit)** icon.
3. Change **Version** dropdown to **New version** *(Essential: updates the live script)*.
4. Ensure **Who has access** is set to **`Anyone`**.
5. Click **Deploy**.
6. When you test the `/exec` link in your browser again, you will see `{"status":"success"}` and the row will appear in your Google Sheet!
