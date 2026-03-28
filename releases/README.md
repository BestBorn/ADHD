# ADHD Focus Chrome Extension - Downloads

## 📦 Latest Build

Download the latest extension package and unpack it in Chrome!

### Download Links

The extension packages are created automatically. You'll find them here:

**File:** `adhd-focus-extension-YYYYMMDD-HHMMSS.zip`

## 🚀 How to Load

### Method 1: Load Unpacked (Easiest)

1. **Download & Extract**
   - Download the latest `.zip` file from this folder
   - Extract it to a folder on your computer

2. **Open Chrome Extensions**
   - Go to `chrome://extensions/` in your browser

3. **Enable Developer Mode**
   - Toggle **"Developer mode"** in the top-right corner

4. **Load Unpacked**
   - Click **"Load unpacked"** button
   - Select the extracted folder
   - Done! 🎯

### Method 2: From Project Directory

```bash
# In the ADHD project folder
./build-extension.sh
```

This creates a new zip file in the `releases/` folder.

## 📋 What's Inside

The zip contains:
```
manifest.json      - Extension configuration
popup.html         - Popup window (900x700px)
popup.js           - App loader
background.js      - Service worker
images/icon.svg    - Extension icon
```

## ✅ Before Loading

Make sure:
1. ✅ You have **npm run dev** running on localhost:3000
2. ✅ The app loads at http://localhost:3000
3. ✅ You extracted the zip properly

## 🎯 After Loading

1. Look for the 🎯 icon in Chrome toolbar
2. Click it to open ADHD Focus
3. All features work from the popup
4. Data saves automatically

## 🆘 Troubleshooting

**Extension won't load?**
- Make sure you selected the extracted folder (not the zip)
- The folder should contain `manifest.json` at the root

**App shows blank?**
- Check that `npm run dev` is running
- Go to `chrome://extensions/` and reload the extension

**Need more help?**
- See `CHROME_EXTENSION.md` in the project root
- Check the main `README.md`

---

**Version:** 1.0.0
**Last Updated:** 2026-03-28
