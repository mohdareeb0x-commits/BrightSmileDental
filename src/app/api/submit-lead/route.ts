import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface LeadData {
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
  variant: 'a' | 'b';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  timestamp: string;
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function getAuthClient() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    throw new Error('Missing Google Sheets configuration. Check environment variables.');
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  return { auth, sheetId };
}

async function ensureHeaders(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'A1:L1',
    });

    const existingHeaders = response.data.values?.[0];
    const expectedHeaders = [
      'Timestamp',
      'Name',
      'Phone',
      'Email',
      'Preferred Time',
      'Variant',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Content',
      'UTM Term',
      'Submitted At',
    ];

    if (!existingHeaders || JSON.stringify(existingHeaders) !== JSON.stringify(expectedHeaders)) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'A1:L1',
        valueInputOption: 'RAW',
        requestBody: { values: [expectedHeaders] },
      });
    }
  } catch (error) {
    console.error('Error ensuring headers:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json();

    const requiredFields: (keyof LeadData)[] = ['name', 'phone', 'email', 'preferredTime', 'variant', 'timestamp'];
    for (const field of requiredFields) {
      if (!body[field] || (typeof body[field] === 'string' && !body[field].trim())) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const PHONE_REGEX = /^[\d\s\-\(\)\+]{10,}$/;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!PHONE_REGEX.test(body.phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!['a', 'b'].includes(body.variant)) {
      return NextResponse.json(
        { success: false, error: 'Invalid variant' },
        { status: 400 }
      );
    }

    const { auth, sheetId } = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    await ensureHeaders(sheets, sheetId);

    const row = [
      body.timestamp,
      body.name.trim(),
      body.phone.trim(),
      body.email.trim().toLowerCase(),
      body.preferredTime,
      body.variant.toUpperCase(),
      body.utm_source || '',
      body.utm_medium || '',
      body.utm_campaign || '',
      body.utm_content || '',
      body.utm_term || '',
      new Date().toISOString(),
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'A:L',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);

    if (error instanceof Error && error.message.includes('Missing Google Sheets configuration')) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to submit lead. Please try again.' },
      { status: 500 }
    );
  }
}