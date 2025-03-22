document.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settingsBtn');
  const settings = document.getElementById('settings');
  const main = document.getElementById('main');
  const apiKeyInput = document.getElementById('apiKey');
  const saveSettingsBtn = document.getElementById('saveSettings');
  const apiStatus = document.getElementById('apiStatus');

  // Load saved API key
  chrome.storage.sync.get(['apiKey'], (result) => {
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
      checkApiStatus(result.apiKey);
    } else {
      apiStatus.textContent = 'No API Key';
      apiStatus.parentElement.firstElementChild.className = 'w-3 h-3 rounded-full bg-red-500';
    }
  });

  // Toggle settings
  settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hidden');
    main.classList.toggle('hidden');
  });

  // Save settings
  saveSettingsBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    
    chrome.storage.sync.set({ apiKey }, () => {
      checkApiStatus(apiKey);
      settings.classList.add('hidden');
      main.classList.remove('hidden');
    });
  });

  async function checkApiStatus(apiKey) {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (response.ok) {
        apiStatus.textContent = 'Connected';
        apiStatus.parentElement.firstElementChild.className = 'w-3 h-3 rounded-full bg-green-500';
      } else {
        apiStatus.textContent = 'Invalid API Key';
        apiStatus.parentElement.firstElementChild.className = 'w-3 h-3 rounded-full bg-red-500';
      }
    } catch (error) {
      apiStatus.textContent = 'Connection Error';
      apiStatus.parentElement.firstElementChild.className = 'w-3 h-3 rounded-full bg-red-500';
    }
  }
});