# Google Sheets Integration Setup Guide

This document explains exactly what you need to set up on your end for the lead form → Google Sheets integration to work.

## Prerequisites

1. A Google Cloud project
2. A Google Sheet to receive leads
3. The `googleapis` npm package (already installed)

---

## Step 1: Create a Google Cloud Project & Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing): **"Bright Smile Dental Leads"**
3. Enable the **Google Sheets API**:
   - Navigate to **APIs & Services → Library**
   - Search for "Google Sheets API"
   - Click **Enable**
4. Create a Service Account:
   - Go to **IAM & Admin → Service Accounts**
   - Click **Create Service Account**
   - Name: `bright-smile-leads-writer`
   - Description: `Writes lead form submissions to Google Sheets`
   - Click **Create and Continue**
   - Skip role assignment (click **Continue** → **Done**)
5. Create a JSON key for the service account:
   - Click on the created service account
   - Go to **Keys** tab → **Add Key** → **Create New Key**
   - Select **JSON** → **Create**
   - Save the downloaded JSON file securely

---

## Step 2: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet: **"Bright Smile Dental - Leads"**
3. Copy the **Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - The `SHEET_ID` is the long string between `/d/` and `/edit`
4. **Share the sheet with the service account**:
   - Click **Share** (top right)
   - Paste the **service account email** (from the JSON key: `client_email` field)
   - Set permission to **Editor**
   - Uncheck "Notify people"
   - Click **Share**

---

## Step 3: Configure Environment Variables

Add these to your `.env.local` file (never commit this file):

```env
# Google Sheets Integration (Service Account)
GOOGLE_SERVICE_ACCOUNT_EMAIL=bright-smile-leads-writer@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id-from-step-2
```

### Important: Private Key Format

The private key from the JSON file contains literal newlines. You must escape them for the environment variable:

**Option A: Use the CLI to format it**
```bash
# Run this in your terminal, paste the private key when prompted
node -e "console.log(JSON.stringify(require('fs').readFileSync('path/to/key.json', 'utf8')))"
```

**Option B: Manual replacement**
- Copy the `private_key` value from the JSON file
- Replace every actual newline with `\n` (literal backslash-n)
- Wrap the entire thing in quotes

Example:
```
# In JSON file:
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# In .env.local:
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

---

## Step 4: Verify the Setup

1. Start the dev server: `npm run dev`
2. Go to `http://localhost:3000`
3. Fill out and submit the form
4. Check your Google Sheet — a new row should appear with:
   - Timestamp
   - Name, Phone, Email, Preferred Time
   - Variant (A or B)
   - UTM parameters (if present in URL)
   - Submission timestamp

---

## Column Mapping (Auto-Created)

The API automatically creates these headers on first run:

| Column | Source |
|--------|--------|
| A: Timestamp | Form submission time (from client) |
| B: Name | Form field |
| C: Phone | Form field |
| D: Email | Form field |
| E: Preferred Time | Form field |
| F: Variant | A/B test variant (A or B) |
| G: UTM Source | URL parameter |
| H: UTM Medium | URL parameter |
| I: UTM Campaign | URL parameter |
| J: UTM Content | URL parameter |
| K: UTM Term | URL parameter |
| L: Submitted At | Server receipt time |

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Missing Google Sheets configuration` | Env vars not set | Check `.env.local` exists and has all 3 vars |
| `Invalid grant` / `Unauthorized` | Bad private key or email | Verify key format (escaped newlines), correct email |
| `The caller does not have permission` | Sheet not shared | Share sheet with service account email as Editor |
| `API not enabled` | Sheets API off | Enable Google Sheets API in Cloud Console |
| `Quota exceeded` | Too many requests | Rare for this use case; implement retry logic if needed |

---

## Security Notes

- **Never commit** `.env.local` or the service account JSON key
- The service account only has access to sheets you explicitly share
- Rotate the key periodically (create new key, delete old)
- Consider using Secret Manager in production (Vercel has built-in env var encryption)