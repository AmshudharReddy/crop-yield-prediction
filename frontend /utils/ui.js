export function createContainer() {
  const container = document.createElement('div');
  container.className = 'ai-response-container';
  return container;
}

export function createHeader() {
  const header = document.createElement('div');
  header.className = 'ai-response-header';
  
  const title = document.createElement('div');
  title.className = 'ai-response-title';
  title.textContent = 'AI Analysis';
  
  const closeButton = document.createElement('div');
  closeButton.className = 'ai-response-close';
  closeButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  `;
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  return { header, closeButton };
}

export function createContent() {
  const content = document.createElement('div');
  content.className = 'ai-response-content';
  return content;
}

export function positionContainer(container) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    container.style.left = `${window.scrollX + Math.min(rect.left, window.innerWidth - container.offsetWidth - 20)}px`;
    container.style.top = `${window.scrollY + rect.bottom + 10}px`;
  }
}