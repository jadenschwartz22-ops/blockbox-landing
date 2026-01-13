/**
 * BlockBox Waitlist - Google Apps Script
 *
 * This script receives form submissions from your landing page and saves them to Google Sheets.
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Create a new Google Sheet named "BlockBox Waitlist"
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click Deploy > New deployment
 * 5. Select type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy
 * 9. Copy the Web App URL
 * 10. Paste it into script.js where it says 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE'
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Check if this is the first submission (add headers)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Email',
        'Struggles',
        'Who Is This For',
        'Devices',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign',
        'Form ID',
        'Referrer',
        'User Agent'
      ]);

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 11);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }

    // Append the new submission
    sheet.appendRow([
      data.timestamp,
      data.email,
      data.struggles,
      data.who,
      data.devices,
      data.utm_source,
      data.utm_medium,
      data.utm_campaign,
      data.form_id,
      data.referrer,
      data.user_agent
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 11);

    // Send email notification (optional - uncomment if you want email alerts)
    // sendEmailNotification(data);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Submission recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());

    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Send email notification for each new signup
function sendEmailNotification(data) {
  const recipient = 'YOUR_EMAIL@example.com'; // Change this to your email
  const subject = '🎉 New BlockBox Waitlist Signup!';

  const body = `
New signup details:

Email: ${data.email}
Struggles: ${data.struggles || 'None selected'}
Who: ${data.who || 'None selected'}
Devices: ${data.devices || 'None selected'}
Source: ${data.utm_source}
Medium: ${data.utm_medium}
Campaign: ${data.utm_campaign}
Timestamp: ${data.timestamp}

View full sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
  `;

  MailApp.sendEmail(recipient, subject, body);
}

// Test function - run this to verify the script works
function test() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        struggles: 'social, gaming',
        who: 'myself',
        devices: 'phone, laptop',
        utm_source: 'test',
        utm_medium: 'test',
        utm_campaign: 'test',
        timestamp: new Date().toISOString(),
        form_id: 'test',
        user_agent: 'Test Browser',
        referrer: 'direct'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
