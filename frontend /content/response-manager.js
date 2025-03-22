const responseManager = {
  container: null,

  createResponseContainer() {
    if (this.container) {
      document.body.removeChild(this.container);
    }

    const container = ui.createContainer();
    const { header, closeButton } = ui.createHeader();
    const content = ui.createContent();
    
    closeButton.onclick = () => {
      document.body.removeChild(container);
      this.container = null;
    };
    
    container.appendChild(header);
    container.appendChild(content);
    document.body.appendChild(container);
    
    ui.positionContainer(container);
    this.container = container;
    
    return content;
  },

  showLoading() {
    const content = this.createResponseContainer();
    content.className = 'ai-response-loading';
    content.innerHTML = `
      <svg class="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    `;
  },

  showResponse(response) {
    const content = this.createResponseContainer();
    content.className = 'ai-response-content';
    content.textContent = response;
  },

  showError(error) {
    const content = this.createResponseContainer();
    content.className = 'ai-response-error';
    content.textContent = error;
  }
};