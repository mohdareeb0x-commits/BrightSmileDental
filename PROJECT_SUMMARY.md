# Bright Smile Dental - Landing Page

A conversion-focused landing page for a fictional dental clinic offering a "Free Teeth Whitening Consultation" promotion. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 🎯 Project Goal

This page exists for **ONE conversion action**: booking a free consultation via the lead form. Every design and copy decision serves that single goal.

## 🚀 Quick Start

```bash
cd bright-smile-dental
npm install
npm run dev
```

Visit `http://localhost:3000` for Variant A, or `http://localhost:3000?v=b` for Variant B.

---

## 📋 Features Implemented

### A/B Testing
- **Variant A** (Urgency/Promotion): `"Free Whitening Consultation — This Month Only"` / CTA: `"Claim My Free Spot"`
- **Variant B** (Outcome/Benefit): `"Get the Smile You've Been Putting Off"` / CTA: `"Book My Free Consultation"`
- Switchable via `?v=a` or `?v=b` query parameter
- Variant tracked in all analytics events and form submissions

### Page Sections
1. **Hero** - Headline, subheadline, primary CTA, trust badges (500+ patients, 4.9★, licensed), hero illustration
2. **Problem/Benefit** - 3 friction points addressed (time, cost, embarrassment)
3. **What's Included** - 4 items: Exam, Consultation, Treatment Plan, Zero Obligation
4. **Social Proof** - 3 testimonials with names, locations, outcomes
5. **Lead Form** - 4 fields (name, phone, email, preferred time) + hidden UTM/variant fields
6. **Final CTA** - Restates offer for scroll-past visitors
7. **Footer** - Clinic info, hours, minimal links

### Tracking Infrastructure
- **Google Tag Manager (GTM)** - Container for all tracking
- **GA4** - Page views, scroll depth (25/50/75/100%), CTA clicks, form submissions
- **Meta Pixel** - PageView on load, Lead event on form submit
- **All events tagged with `ab_variant`** for A/B comparison

### UTM Parameter Capture
- Reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from URL
- Stores in `sessionStorage`
- Includes as hidden fields in form submission

### Lead Form → Google Sheets
- API route: `POST /api/submit-lead`
- Validates: required fields, phone format, email format, variant
- Appends row to Google Sheet via Service Account (googleapis)
- Returns confirmation state (not just alert)

---

## 🔧 Required Setup (Before Form Submission Works)

### 1. Google Cloud Setup
```
1. Create project at console.cloud.google.com
2. Enable Google Sheets API
3. Create Service Account: "bright-smile-leads-writer"
4. Create JSON key for service account
```

### 2. Google Sheet Setup
```
1. Create sheet: "Bright Smile Dental - Leads"
2. Copy Sheet ID from URL
3. Share with service account email (Editor permission)
```

### 3. Environment Variables (`.env.local`)
```env
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Meta Pixel (Facebook)
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456

# Google Sheets Integration
GOOGLE_SERVICE_ACCOUNT_EMAIL=bright-smile-leads-writer@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id-from-step-2
```

**Important**: Escape newlines in private key as `\n` (literal backslash-n). See `GOOGLE_SHEETS_SETUP.md` for details.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/submit-lead/route.ts    # Google Sheets API endpoint
│   ├── globals.css                  # Tailwind + custom components
│   ├── layout.tsx                   # Root layout + tracking scripts
│   └── page.tsx                     # Main page (server component)
├── components/
│   ├── Hero.tsx                     # Hero section with variant support
│   ├── ProblemBenefit.tsx           # Problem/solution section
│   ├── WhatsIncluded.tsx            # 4-item feature list
│   ├── SocialProof.tsx              # Testimonials + CTA
│   ├── LeadForm.tsx                 # Form with validation + success state
│   ├── FinalCTA.tsx                 # Bottom CTA section
│   ├── Footer.tsx                   # Minimal footer
│   ├── TrackingScript.tsx           # GTM + Meta Pixel initialization
│   └── UTMCapture.tsx               # UTM parameter capture
└── lib/
    ├── variants.ts                  # A/B variant config + helpers
    ├── tracking.ts                  # Event tracking functions
    └── utm.ts                       # UTM capture/storage helpers
```

---

## 🎨 Design System

### Colors (Tailwind config)
- **Primary**: `#0D9488` (teal-600)
- **Secondary**: `#0F766E` (teal-700)
- **Accent**: `#14B8A6` (teal-500)
- **Background**: `#F0FDFA` (teal-50)
- **Text**: `#1F2937` (gray-800)

### Components
- `.btn-primary` - High-contrast CTA buttons with hover/active states
- `.input-field` - Form inputs with focus rings
- `.section-container` - Max-width wrapper with responsive padding

---

## ✅ Verification Checklist

Before deploying to Vercel:

- [ ] Add all environment variables in Vercel dashboard
- [ ] Verify Google Sheet receives test submission
- [ ] Test both variants: `?v=a` and `?v=b`
- [ ] Verify GTM container fires GA4 + Meta Pixel
- [ ] Test UTM parameters persist through form submit
- [ ] Confirm Meta Pixel Lead event fires on success
- [ ] Run Lighthouse audit (target 90+ Performance)

---

## 🚀 Deployment

```bash
# Push to GitHub
git add .
git commit -m "Initial landing page"
git push origin main

# Connect to Vercel
# 1. Import repo in Vercel
# 2. Add all environment variables
# 3. Deploy
```

---

## 📊 Tracking Events Reference

| Event | Trigger | Properties |
|-------|---------|------------|
| `page_view` | Page load | `page_path`, `ab_variant` |
| `scroll_depth` | 25%, 50%, 75%, 100% | `percent`, `ab_variant` |
| `cta_click` | Any CTA button | `location` (hero/social_proof/final_cta), `ab_variant` |
| `form_submit` | Successful submission | `form_type`, `ab_variant` |
| `Lead` (Meta) | Successful submission | All form data + `ab_variant` |

---

## 📝 Notes for Agencies

This is a **portfolio piece demonstrating**:
1. Conversion-focused single-goal landing page design
2. Proper A/B testing infrastructure with variant tracking
3. Professional GTM-based tracking setup (not hardcoded pixels)
4. UTM capture for campaign attribution
5. Secure Google Sheets integration via Service Account
6. Mobile-first, accessible, performant implementation
7. Clean component architecture for maintainability

The page is production-ready — just add your client's GTM/Pixel IDs and Google Sheets credentials.