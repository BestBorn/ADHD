// Background service worker for ADHD Focus extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('ADHD Focus extension installed!');
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_STORED_DATA') {
    // Retrieve data from chrome storage
    chrome.storage.local.get(null, (items) => {
      sendResponse({ data: items });
    });
    return true; // Will respond asynchronously
  }

  if (request.type === 'SAVE_DATA') {
    // Save data to chrome storage (as backup)
    chrome.storage.local.set(request.data, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});
