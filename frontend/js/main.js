import init, { process_card_input, init_panic_hook } from '../pkg/card_proxy_wasm.js';

class MTGProxyApp {
  constructor() {
    this.wasmModule = null;
    this.elements = {
      cardInput: document.getElementById('card-input'),
      generateBtn: document.getElementById('generate-btn'),
      loading: document.getElementById('loading'),
      results: document.getElementById('results'),
      error: document.getElementById('error'),
      errorMessage: document.getElementById('error-message'),
      cardGrid: document.getElementById('card-grid')
    };

    this.init();
  }

  async init() {
    try {
      // Initialize WASM module
      this.wasmModule = await init();
      init_panic_hook();

      // Set up event listeners
      this.setupEventListeners();

      console.log('MTG Proxy App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize WASM module:', error);
      this.showError('Failed to initialize the application. Please refresh the page.');
    }
  }

  setupEventListeners() {
    this.elements.generateBtn.addEventListener('click', () => {
      this.generateCards();
    });

    // Allow Ctrl+Enter to submit
    this.elements.cardInput.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        this.generateCards();
      }
    });
  }

  async generateCards() {
    const input = this.elements.cardInput.value.trim();

    if (!input) {
      this.showError('Please enter some card names.');
      return;
    }

    try {
      this.showLoading();

      // Call the WASM function to process card input
      const results = await process_card_input(input);

      this.displayResults(results);
    } catch (error) {
      console.error('Error generating cards:', error);
      this.showError(`Error generating cards: ${error.message || error}`);
    }
  }

  showLoading() {
    this.elements.loading.style.display = 'block';
    this.elements.results.style.display = 'none';
    this.elements.error.style.display = 'none';
    this.elements.generateBtn.disabled = true;
  }

  hideLoading() {
    this.elements.loading.style.display = 'none';
    this.elements.generateBtn.disabled = false;
  }

  showError(message) {
    this.hideLoading();
    this.elements.error.style.display = 'block';
    this.elements.results.style.display = 'none';
    this.elements.errorMessage.textContent = message;
  }

  displayResults(cards) {
    this.hideLoading();
    this.elements.results.style.display = 'block';
    this.elements.error.style.display = 'none';

    // Clear previous results
    this.elements.cardGrid.innerHTML = '';

    if (!cards || cards.length === 0) {
      this.showError('No cards found. Please check your input.');
      return;
    }

    // Display each card
    cards.forEach(card => {
      this.createCardElement(card);
    });
  }

  createCardElement(processedCard) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-item';

    const cardData = processedCard.card_data;

    cardElement.innerHTML = `
            <div class="card-header">
                <div class="card-name">${this.escapeHtml(cardData.name)}</div>
                <div class="card-quantity">${processedCard.quantity}x</div>
            </div>
            ${cardData.image_uris && cardData.image_uris.normal ?
        `<img class="card-image" src="${cardData.image_uris.normal}" alt="${this.escapeHtml(cardData.name)}" loading="lazy">` :
        '<div class="card-image-placeholder">No image available</div>'
      }
            <div class="card-details">
                <div><strong>Set:</strong> ${this.escapeHtml(cardData.set_name || 'Unknown')}</div>
                <div><strong>Type:</strong> ${this.escapeHtml(cardData.type_line || 'Unknown')}</div>
                ${cardData.mana_cost ? `<div class="card-mana-cost">${this.escapeHtml(cardData.mana_cost)}</div>` : ''}
                ${cardData.oracle_text ? `<div class="card-text">${this.escapeHtml(cardData.oracle_text)}</div>` : ''}
            </div>
        `;

    this.elements.cardGrid.appendChild(cardElement);
  }

  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new MTGProxyApp();
});
