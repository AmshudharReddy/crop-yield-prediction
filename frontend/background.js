importScripts('background/menu.js');
importScripts('background/ai-service.js');

const aiService = new AIService();

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'analyzeText') {
    try {
      // Show loading state
      await chrome.tabs.sendMessage(tab.id, {
        type: 'showLoading'
      });

      // Get AI response
      const response = await aiService.getResponse(info.selectionText);

      // Show response
      await chrome.tabs.sendMessage(tab.id, {
        type: 'showResponse',
        response: response
      });
    } catch (error) {
      console.error('Analysis Error:', error);
      await chrome.tabs.sendMessage(tab.id, {
        type: 'showError',
        error: 'Failed to analyze text. Please try again.'
      });
    }
  }
});