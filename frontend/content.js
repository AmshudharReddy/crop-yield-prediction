// Initialize response manager
let initialized = false;

function initialize() {
  if (!initialized) {
    // Create a container for our scripts
    const scriptContainer = document.createElement('div');
    scriptContainer.style.display = 'none';
    document.body.appendChild(scriptContainer);

    // Load UI helper script
    const uiScript = document.createElement('script');
    uiScript.src = chrome.runtime.getURL('content/ui.js');
    scriptContainer.appendChild(uiScript);

    // Load response manager script
    const responseScript = document.createElement('script');
    responseScript.src = chrome.runtime.getURL('content/response-manager.js');
    scriptContainer.appendChild(responseScript);

    initialized = true;
  }
}

// Initialize on document load
initialize();

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case 'showLoading':
      responseManager.showLoading();
      break;
    case 'showResponse':
      responseManager.showResponse(message.response);
      break;
    case 'showError':
      responseManager.showError(message.error);
      break;
  }
});