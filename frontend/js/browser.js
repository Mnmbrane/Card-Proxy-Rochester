class CardBrowser {
  constructor() {
    this.selectedCards = new Map(); // cardName -> quantity
    this.currentCategory = 'all';
    this.popularCards = this.getPopularCards();
    this.lastRequestTime = 0;
    this.requestDelay = 150; // 150ms delay between API requests
    this.cache = new Map(); // cardName -> cardData cache
    this.searchTimeout = null;
    
    this.elements = {
      cardBrowser: document.getElementById('card-browser'),
      selectedSection: document.getElementById('selected-section'),
      selectedCards: document.getElementById('selected-cards'),
      cardSearch: document.getElementById('card-search'),
      searchBtn: document.getElementById('search-btn'),
      printBtn: document.getElementById('print-selected'),
      clearBtn: document.getElementById('clear-selected'),
      categoryBtns: document.querySelectorAll('.category-btn')
    };
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.displayCards(this.popularCards);
  }
  
  setupEventListeners() {
    // Category buttons
    this.elements.categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.setActiveCategory(btn.dataset.category);
        this.filterCardsByCategory(btn.dataset.category);
      });
    });
    
    // Search functionality with debouncing
    this.elements.searchBtn.addEventListener('click', () => {
      this.searchCards();
    });
    
    this.elements.cardSearch.addEventListener('input', (e) => {
      // Clear existing timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      
      // Set new timeout to search after user stops typing
      this.searchTimeout = setTimeout(() => {
        this.searchCards();
      }, 500);
    });
    
    this.elements.cardSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
        this.searchCards();
      }
    });
    
    // Print and clear buttons
    this.elements.printBtn.addEventListener('click', () => {
      this.printSelectedCards();
    });
    
    this.elements.clearBtn.addEventListener('click', () => {
      this.clearSelection();
    });
  }
  
  getPopularCards() {
    return [
      { name: "Lightning Bolt", type: "spells", mana_cost: "{R}", image: "https://cards.scryfall.io/normal/front/c/e/ce711943-c1a1-43a0-8b89-8d169cfb8e06.jpg" },
      { name: "Counterspell", type: "spells", mana_cost: "{U}{U}", image: "https://cards.scryfall.io/normal/front/1/9/1920dae4-fb92-4f19-ae4b-eb3276b8dac7.jpg" },
      { name: "Sol Ring", type: "artifacts", mana_cost: "{1}", image: "https://cards.scryfall.io/normal/front/4/c/4cbc6901-6a4a-4d0a-83ea-7eefa3b35021.jpg" },
      { name: "Birds of Paradise", type: "creatures", mana_cost: "{G}", image: "https://cards.scryfall.io/normal/front/f/e/feefe9f0-24a6-461c-9ef1-86c5a6f33b83.jpg" },
      { name: "Black Lotus", type: "artifacts", mana_cost: "{0}", image: "https://cards.scryfall.io/normal/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg" },
      { name: "Force of Will", type: "spells", mana_cost: "{3}{U}{U}", image: "https://cards.scryfall.io/normal/front/d/d/dd60b291-0a88-4e8e-bef8-76cdfd6c8183.jpg" },
      { name: "Tarmogoyf", type: "creatures", mana_cost: "{1}{G}", image: "https://cards.scryfall.io/normal/front/6/9/69daba76-96e8-4bcc-ab79-2f00189ad8fb.jpg" },
      { name: "Fetchlands", type: "lands", mana_cost: "", image: "https://cards.scryfall.io/normal/front/c/3/c3c58c94-5986-4a67-a5fb-a0b48a62fb54.jpg" },
      { name: "Brainstorm", type: "spells", mana_cost: "{U}", image: "https://cards.scryfall.io/normal/front/0/3/0359f212-9564-41a9-870b-d2c57455a695.jpg" },
      { name: "Swords to Plowshares", type: "spells", mana_cost: "{W}", image: "https://cards.scryfall.io/normal/front/b/e/be2b4177-e47c-4dde-9ead-31b7602065ec.jpg" },
      { name: "Dark Ritual", type: "spells", mana_cost: "{B}", image: "https://cards.scryfall.io/normal/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg" },
      { name: "Mana Crypt", type: "artifacts", mana_cost: "{0}", image: "https://cards.scryfall.io/normal/front/4/d/4d960186-4559-4af0-bd22-63baa15f8939.jpg" }
    ];
  }
  
  displayCards(cards) {
    this.elements.cardBrowser.innerHTML = '';
    
    cards.forEach(card => {
      const cardElement = this.createCardElement(card);
      this.elements.cardBrowser.appendChild(cardElement);
    });
  }
  
  createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'browse-card-item';
    
    cardDiv.innerHTML = `
      <div class="card-image-container">
        <img src="${card.image}" alt="${card.name}" class="browse-card-image" loading="lazy" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div class="image-placeholder" style="display: none; padding: 40px; text-align: center; color: #666;">
          Card Image<br>Unavailable
        </div>
      </div>
      <div class="card-info">
        <h3 class="card-name">${card.name}</h3>
        <div class="card-mana-cost">${card.mana_cost}</div>
        <div class="card-actions">
          <button class="add-card-btn" data-card-name="${card.name}">Add to Selection</button>
          <div class="quantity-controls" style="display: none;">
            <button class="qty-btn minus" data-card-name="${card.name}">-</button>
            <span class="quantity">1</span>
            <button class="qty-btn plus" data-card-name="${card.name}">+</button>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners
    const addBtn = cardDiv.querySelector('.add-card-btn');
    const minusBtn = cardDiv.querySelector('.minus');
    const plusBtn = cardDiv.querySelector('.plus');
    
    addBtn.addEventListener('click', () => {
      this.addCardToSelection(card.name);
      this.toggleCardControls(cardDiv, true);
    });
    
    minusBtn.addEventListener('click', () => {
      this.decreaseCardQuantity(card.name);
      if (!this.selectedCards.has(card.name)) {
        this.toggleCardControls(cardDiv, false);
      } else {
        this.updateQuantityDisplay(cardDiv, this.selectedCards.get(card.name));
      }
    });
    
    plusBtn.addEventListener('click', () => {
      this.increaseCardQuantity(card.name);
      this.updateQuantityDisplay(cardDiv, this.selectedCards.get(card.name));
    });
    
    return cardDiv;
  }
  
  toggleCardControls(cardElement, show) {
    const addBtn = cardElement.querySelector('.add-card-btn');
    const controls = cardElement.querySelector('.quantity-controls');
    
    addBtn.style.display = show ? 'none' : 'block';
    controls.style.display = show ? 'flex' : 'none';
  }
  
  updateQuantityDisplay(cardElement, quantity) {
    const quantitySpan = cardElement.querySelector('.quantity');
    quantitySpan.textContent = quantity;
  }
  
  addCardToSelection(cardName) {
    this.selectedCards.set(cardName, 1);
    this.updateSelectedSection();
  }
  
  increaseCardQuantity(cardName) {
    const current = this.selectedCards.get(cardName) || 0;
    this.selectedCards.set(cardName, current + 1);
    this.updateSelectedSection();
  }
  
  decreaseCardQuantity(cardName) {
    const current = this.selectedCards.get(cardName);
    if (current <= 1) {
      this.selectedCards.delete(cardName);
    } else {
      this.selectedCards.set(cardName, current - 1);
    }
    this.updateSelectedSection();
  }
  
  updateSelectedSection() {
    if (this.selectedCards.size === 0) {
      this.elements.selectedSection.style.display = 'none';
      return;
    }
    
    this.elements.selectedSection.style.display = 'block';
    this.elements.selectedCards.innerHTML = '';
    
    for (const [cardName, quantity] of this.selectedCards) {
      const selectedCard = document.createElement('div');
      selectedCard.className = 'selected-card-item';
      selectedCard.innerHTML = `
        <span class="selected-card-name">${cardName}</span>
        <span class="selected-quantity">${quantity}x</span>
        <button class="remove-selected" data-card-name="${cardName}">×</button>
      `;
      
      selectedCard.querySelector('.remove-selected').addEventListener('click', () => {
        this.selectedCards.delete(cardName);
        this.updateSelectedSection();
        this.resetCardInBrowser(cardName);
      });
      
      this.elements.selectedCards.appendChild(selectedCard);
    }
  }
  
  resetCardInBrowser(cardName) {
    const cardElements = this.elements.cardBrowser.querySelectorAll('.browse-card-item');
    cardElements.forEach(cardElement => {
      const addBtn = cardElement.querySelector('.add-card-btn');
      if (addBtn && addBtn.dataset.cardName === cardName) {
        this.toggleCardControls(cardElement, false);
      }
    });
  }
  
  setActiveCategory(category) {
    this.currentCategory = category;
    this.elements.categoryBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });
  }
  
  filterCardsByCategory(category) {
    if (category === 'all') {
      this.displayCards(this.popularCards);
    } else {
      const filtered = this.popularCards.filter(card => card.type === category);
      this.displayCards(filtered);
    }
  }
  
  async searchCards() {
    const query = this.elements.cardSearch.value.trim();
    if (!query) {
      this.displayCards(this.popularCards);
      return;
    }
    
    try {
      // Show loading state
      this.elements.cardBrowser.innerHTML = '<div class="loading-message">Searching cards...</div>';
      
      const searchResults = await this.searchScryfallAPI(query);
      this.displayCards(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      this.elements.cardBrowser.innerHTML = '<div class="error-message">Search failed. Please try again.</div>';
      
      // Fallback to local filter
      setTimeout(() => {
        const filtered = this.popularCards.filter(card => 
          card.name.toLowerCase().includes(query.toLowerCase())
        );
        this.displayCards(filtered);
      }, 2000);
    }
  }
  
  async searchScryfallAPI(query) {
    // Check cache first
    const cacheKey = `search:${query.toLowerCase()}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    // Rate limiting: ensure 150ms delay between requests
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.requestDelay) {
      await this.delay(this.requestDelay - timeSinceLastRequest);
    }
    
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.scryfall.com/cards/search?q=${encodedQuery}&order=name&page=1`;
    
    this.lastRequestTime = Date.now();
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MTG-Proxy-Printer/1.0 (Educational/Personal Use)'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        // No cards found
        return [];
      }
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    const cards = data.data.slice(0, 20).map(card => ({
      name: card.name,
      type: this.categorizeCard(card.type_line),
      mana_cost: card.mana_cost || '',
      image: card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || '',
      set_name: card.set_name,
      type_line: card.type_line,
      oracle_text: card.oracle_text
    }));
    
    // Cache the results
    this.cache.set(cacheKey, cards);
    
    return cards;
  }
  
  categorizeCard(typeLine) {
    if (!typeLine) return 'spells';
    
    const type = typeLine.toLowerCase();
    if (type.includes('creature')) return 'creatures';
    if (type.includes('land')) return 'lands';
    if (type.includes('artifact')) return 'artifacts';
    return 'spells';
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  printSelectedCards() {
    if (this.selectedCards.size === 0) {
      alert('Please select some cards first.');
      return;
    }
    
    // Convert selected cards to the format expected by the generator
    const cardList = Array.from(this.selectedCards.entries())
      .map(([name, qty]) => `${qty}x ${name}`)
      .join('\n');
    
    // Save to localStorage for the generator page to pick up
    localStorage.setItem('selectedCards', cardList);
    
    // Navigate to generator page
    window.location.href = 'generator.html';
  }
  
  clearSelection() {
    this.selectedCards.clear();
    this.updateSelectedSection();
    
    // Reset all card controls in browser
    const cardElements = this.elements.cardBrowser.querySelectorAll('.browse-card-item');
    cardElements.forEach(cardElement => {
      this.toggleCardControls(cardElement, false);
    });
  }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new CardBrowser();
});