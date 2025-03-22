const MENU_ID = 'analyzeText';

function createContextMenu() {
  // Remove existing menu items first to prevent duplicates
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: 'Analyze Selected Text',
      contexts: ['selection']
    });
  });
}

// Initialize context menu when the extension is installed or updated
chrome.runtime.onInstalled.addListener(createContextMenu);