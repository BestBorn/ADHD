# ADHD Focus - Chrome Extension Setup

This guide will help you set up and run ADHD Focus as a Chrome extension.

## Prerequisites

- Chrome/Chromium browser
- Node.js and npm installed
- ADHD Focus app running locally

## Setup Instructions

### Step 1: Start the Development Server

First, start the Next.js development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 2: Load the Extension in Chrome

1. Open Chrome and go to: `chrome://extensions/`

2. Enable **"Developer mode"** by clicking the toggle in the top right corner

3. Click **"Load unpacked"** button

4. Navigate to your project directory: `/home/user/ADHD/public`

5. Select the `public` folder and click **"Select Folder"**

6. The ADHD Focus extension should now appear in your extensions list!

### Step 3: Use the Extension

1. Look for the 🎯 icon in your Chrome toolbar (top right)

2. Click it to open ADHD Focus in a popup window (900x700px)

3. The app will load from your localhost development server

4. All your data is saved locally in the browser storage

## Features in Extension Mode

✅ All features work the same as the web app:
- Task Manager
- Habit Tracker
- Pomodoro Timer
- Dashboard
- Focus Mode

✅ Data persists across sessions (localStorage)

✅ Responsive popup window

## File Structure

```
public/
├── manifest.json      # Extension configuration
├── popup.html         # Popup window HTML
├── popup.js          # Popup loader script
├── background.js     # Service worker
└── images/
    └── icon.svg      # Extension icon
```

## Troubleshooting

### Extension won't load?
- Make sure you selected the `public` folder, not the root directory
- The manifest.json must be directly in the public folder

### App not showing in popup?
- Make sure `npm run dev` is running on localhost:3000
- Check Chrome DevTools console (right-click popup → Inspect) for errors
- Allow localhost in extension permissions

### Data not saving?
- Data is saved in localStorage, which is specific to each origin
- localhost:3000 and the extension have different storage contexts
- Currently data syncs through the iframe

### Extension icon not showing?
- Icons can take a moment to load
- Try refreshing the extension (toggle off/on in chrome://extensions)

## Development Tips

### Reload the extension after code changes:
1. Go to `chrome://extensions/`
2. Click the refresh icon (🔄) on ADHD Focus card
3. The extension will reload with your latest changes

### Debug the popup:
1. Right-click on the extension icon
2. Select "Inspect popup"
3. DevTools will open showing the popup iframe

### View extension logs:
1. Go to `chrome://extensions/`
2. Click "Details" on ADHD Focus
3. Look for "Errors" section

## Known Limitations

1. **App must be running locally** - The extension loads the app from localhost:3000. You must run `npm run dev` for the extension to work.

2. **Same-origin policy** - The iframe is sandboxed, so some advanced features may need additional permissions.

3. **Storage context** - localStorage in the iframe (localhost:3000) is separate from the extension's storage. Data is automatically synced through the iframe.

## Future Improvements

- [ ] Bundle Next.js app directly into extension
- [ ] Offline support with Service Worker caching
- [ ] Sync data with chrome.storage API
- [ ] Keyboard shortcuts
- [ ] Context menu integration
- [ ] Dark mode toggle

## Building for Production

To create a standalone Chrome extension:

```bash
npm run build
# Bundle the .next folder into a production extension
# (Requires additional setup beyond this guide)
```

For now, the extension is designed for development/personal use with localhost.

## Need Help?

1. Check the main README.md for general app info
2. Check QUICK_START.md for app usage tips
3. Inspect the popup window (right-click → Inspect)
4. Check chrome://extensions for error messages

---

**Enjoy using ADHD Focus in your browser! 🎯💡**
