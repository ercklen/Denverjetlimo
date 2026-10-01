# Denvertrip Tracking & Consent Documentation

This document explains the Google Analytics 4 (GA4), Google Ads, and Custom Cookie Consent infrastructure integrated into the website.

## 1. Configuration & Tracking IDs

The entire tracking and consent system is centralized in `tracking.js`.

To update your Google IDs, open `tracking.js` and edit the `CONFIG` object at the very top:

```javascript
const CONFIG = {
  GA4_MEASUREMENT_ID: 'G-38XNTL49BZ', // Your GA4 Measurement ID
  GOOGLE_ADS_CONVERSION_ID: 'AW-11549299572', // Your Google Ads Conversion ID
  GOOGLE_ADS_CONVERSION_LABEL: '[PASTE_CONVERSION_LABEL_HERE]' // Optional: Ads Conversion Label
};
```

## 2. Custom Cookie Consent System & Google Consent Mode v2

A lightweight, 100% free, and fully compliant cookie consent banner is built directly into `tracking.js`. No third-party CMPs (like Cookiebot or OneTrust) are used.

### How it works:
* **Default State**: Before the user chooses, Google Consent Mode is set to `denied` for analytics and advertising. This means GA4 fires "cookieless pings" and no PII/cookies are read.
* **Banner**: New visitors see a sleek banner at the bottom of the screen.
* **Accept All**: Grants all permissions (`analytics_storage`, `ad_storage`, etc.).
* **Reject All**: Keeps all permissions denied.
* **Manage Preferences**: Opens a modal where users can individually toggle Analytics and Advertising cookies.
* **Persistence**: Choices are saved in `localStorage` under the key `cookie_consent` so the banner doesn't show again.
* **Cookie Settings Link**: A link is provided in the website footer. Clicking it reopens the preferences modal so users can change their minds at any time.

When the user updates their preference, `gtag('consent', 'update', ...)` is called instantly without requiring a page reload.

## 3. Tracked Events

The `tracking.js` script tracks meaningful interactions dynamically. All tracking respects the visitor's consent choice.

* **`page_view`**: Tracked on load.
* **`phone_click`**: Fired when a `tel:` link is clicked.
* **`email_click`**: Fired when a `mailto:` link is clicked.
* **`whatsapp_click`**: Fired when a `wa.me` link is clicked.
* **`booking_request`**: Fired when CTA buttons containing "book" or "plan" are clicked.
* **`quote_request`**: Fired when CTA buttons containing "quote" are clicked.
* **`contact_form_submit`**: Fired upon successful contact form submission.
* **`generate_lead`**: Fired upon other form submissions.

### Privacy & UTMs
* **No PII** (Names, Emails, Phone numbers, Message contents) is ever sent to GA4.
* **UTM parameters** and **Google Click IDs** (`gclid`, `wbraid`) are parsed from the URL and stored in `sessionStorage`. They are appended to all custom events automatically, so attribution is not lost if the user navigates between pages before converting.

## 4. Google Ads Conversions

### Events to Import
You should link GA4 to Google Ads and import the following GA4 key events as conversions:
* `booking_request`
* `quote_request`
* `contact_form_submit`
* `phone_click`

### Direct Google Ads Tagging
If you prefer direct Google Ads tracking for a primary action, you can paste the Conversion Label into `CONFIG.GOOGLE_ADS_CONVERSION_LABEL`. The script will then fire a direct Google Ads conversion (e.g., `AW-XXXXXXXXX/YYYYYYYYYY`) on form submissions and high-value button clicks.

## 5. Testing the Implementation

1. **Test the Banner**: Open the site in an Incognito window. The banner should appear.
2. **Test Consent Mode**: 
   * Open your browser Console (F12).
   * Run `dataLayer` in the console. You should see a `consent`, `default` push with everything set to `denied`.
   * Click "Accept All". Run `dataLayer` again. You should see a `consent`, `update` push setting them to `granted`.
3. **GA4 DebugView**: Go to GA4 Admin -> DebugView. Perform actions (click phone numbers, submit forms) and verify the events populate.
4. **Google Tag Assistant**: Install the Tag Assistant extension or use [tagassistant.google.com](https://tagassistant.google.com/) to verify the tags load and the Consent state is passed correctly to Google.
