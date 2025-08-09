
// Apps Script to push Sheet edits to your app webhook.
const WEBHOOK_URL = 'https://your-deploy-url.vercel.app/api/webhook/sheets';
function onEdit(e) {
  try {
    const sheet = e.source.getActiveSheet();
    const range = e.range;
    const row = sheet.getRange(range.getRow(), 1, 1, sheet.getLastColumn()).getValues()[0];
    const payload = { sheetName: sheet.getName(), rowIndex: range.getRow(), values: row };
    UrlFetchApp.fetch(WEBHOOK_URL, { method: 'post', contentType: 'application/json', payload: JSON.stringify(payload) });
  } catch (err) { Logger.log(err); }
}
