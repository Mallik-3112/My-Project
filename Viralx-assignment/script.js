class ViralXApp {
    constructor() {
        this.cardStack = [...mockReels];
        this.swipeCount = 0;
        this.savedReels = new Set();
        this.currentCards = [];
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderCards();
        this.updateStats();
    }
    
    bindEvents() {
        // Reset button
        document.getElementById('reset-btn').addEventListener('click', () => this.resetStack());
        
        // Modal close
        document.getElementById('modal-close').addEventListener('click', () => this.closeModal());
        
        // Click outside modal to close
        document.getElementById('script-modal').addEventListener('click', (e) => {
            if (e.target.id === 'script-modal') {
                this.closeModal();
            }
        });
    }
    
    renderCards() {
        const cardStackElement = document.getElementById('card-stack');
        const emptyState = document.getElementById('empty-state');
        
        if (this.cardStack.length === 0) {
            cardStackElement.style.display = 'none';
            emptyState.style.display = 'flex';
            return;
        }
        
        cardStackElement.style.display = 'block';
        emptyState.style.display = 'none';
        cardStackElement.innerHTML = '';
        
        // Show top 3 cards for depth
        const visibleCards = this.cardStack.slice(0, 3);
        
        visibleCards.forEach((reel, index) => {
            const cardElement = this.createCardElement(reel, index);
            cardStackElement.appendChild(cardElement);
        });
        
        // Add event listeners to the top card only
        if (visibleCards.length > 0) {
            const topCard = cardStackElement.firstChild;
            this.addCardEventListeners(topCard, visibleCards[0]);
        }
    }
    
    createCardElement(reel, index) {
        const card = document.createElement('div');
        card.className = 'swipe-card';
        card.style.zIndex = 10 - index;
        card.style.transform = `scale(${1 - index * 0.05}) translateY(${index * 4}px)`;
        
        card.innerHTML = `
            <div class="card-content">
                <!-- Swipe Overlays -->
                <div class="swipe-overlay like">LIKE</div>
                <div class="swipe-overlay skip">SKIP</div>
                <div class="swipe-overlay save">SAVE</div>
                
                <div class="card-image-container">
                    <img src="${reel.thumbnail}" alt="${reel.title}" class="card-image loading" onload="this.classList.remove('loading')">
                </div>
                
                <div class="card-info">
                    <div class="card-header">
                        <div>
                            <h3 class="card-title">${reel.title}</h3>
                            <span class="card-niche">${reel.niche}</span>
                        </div>
                        <button class="script-btn" onclick="app.openModal('${reel.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="card-meta">
                        <span class="card-creator">${reel.creator}</span>
                        <div class="card-stats">
                            <span>👁 ${this.formatNumber(reel.stats.views)}</span>
                            <span>❤️ ${this.formatNumber(reel.stats.likes)}</span>
                            <span>🔄 ${this.formatNumber(reel.stats.shares)}</span>
                        </div>
                    </div>
                    
                    <div class="card-actions">
                        <button class="action-btn skip" onclick="app.handleSwipe('left')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="5,4 15,12 5,20"/>
                            </svg>
                            Skip
                        </button>
                        <button class="action-btn like" onclick="app.handleSwipe('right')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            Like
                        </button>
                        <button class="action-btn save" onclick="app.handleSwipe('up')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                            </svg>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }
    
    addCardEventListeners(cardElement, reel) {
        let startX, startY, currentX, currentY;
        let isDragging = false;
        
        // Mouse events
        cardElement.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        
        // Touch events
        cardElement.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
        
        function handleStart(e) {
            e.preventDefault();
            isDragging = true;
            cardElement.classList.add('dragging');
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            startX = clientX;
            startY = clientY;
            currentX = clientX;
            currentY = clientY;
        }
        
        function handleMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            currentX = clientX;
            currentY = clientY;
            
            const offsetX = currentX - startX;
            const offsetY = currentY - startY;
            
            // Calculate rotation based on horizontal movement
            const rotation = offsetX * 0.1;
            
            // Apply transform
            cardElement.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;
            
            // Show appropriate overlay
            const overlays = cardElement.querySelectorAll('.swipe-overlay');
            overlays.forEach(overlay => overlay.style.opacity = '0');
            
            const threshold = 50;
            if (Math.abs(offsetX) > threshold || Math.abs(offsetY) > threshold) {
                if (Math.abs(offsetX) > Math.abs(offsetY)) {
                    // Horizontal swipe
                    if (offsetX > 0) {
                        // Right swipe (like)
                        cardElement.querySelector('.swipe-overlay.like').style.opacity = Math.min(offsetX / 100, 1);
                    } else {
                        // Left swipe (skip)
                        cardElement.querySelector('.swipe-overlay.skip').style.opacity = Math.min(Math.abs(offsetX) / 100, 1);
                    }
                } else if (offsetY < 0) {
                    // Up swipe (save)
                    cardElement.querySelector('.swipe-overlay.save').style.opacity = Math.min(Math.abs(offsetY) / 100, 1);
                }
            }
        }
        
        function handleEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            cardElement.classList.remove('dragging');
            
            const offsetX = currentX - startX;
            const offsetY = currentY - startY;
            
            const threshold = 100;
            const velocity = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
            
            // Determine swipe direction
            let direction = null;
            if (velocity > threshold) {
                if (Math.abs(offsetX) > Math.abs(offsetY)) {
                    direction = offsetX > 0 ? 'right' : 'left';
                } else if (offsetY < -threshold) {
                    direction = 'up';
                }
            }
            
            if (direction) {
                app.animateCardExit(cardElement, direction);
                setTimeout(() => {
                    app.handleSwipe(direction);
                }, 300);
            } else {
                // Snap back
                cardElement.style.transform = '';
                const overlays = cardElement.querySelectorAll('.swipe-overlay');
                overlays.forEach(overlay => overlay.style.opacity = '0');
            }
        }
    }
    
    animateCardExit(cardElement, direction) {
        const distance = window.innerWidth;
        let transform = '';
        
        switch (direction) {
            case 'left':
                transform = `translateX(-${distance}px) rotate(-30deg)`;
                break;
            case 'right':
                transform = `translateX(${distance}px) rotate(30deg)`;
                break;
            case 'up':
                transform = `translateY(-${distance}px) rotate(15deg)`;
                break;
        }
        
        cardElement.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        cardElement.style.transform = transform;
        cardElement.style.opacity = '0';
    }
    
    handleSwipe(direction) {
        const card = this.cardStack[0];
        if (!card) return;
        
        // Remove the top card
        this.cardStack.shift();
        this.swipeCount++;
        
        // Show appropriate feedback
        if (direction === 'right') {
            this.showToast('Liked! ❤️', 'Reel added to your liked content.');
        } else if (direction === 'up') {
            this.savedReels.add(card.id);
            this.showToast('Saved! 💾', 'Reel added to your favorites.');
        } else {
            this.showToast('Skipped ⏭️', 'Moving to next reel.');
        }
        
        // If we're running low on cards, add more
        if (this.cardStack.length <= 3) {
            setTimeout(() => {
                this.cardStack.push(...mockReels);
                this.updateStats();
            }, 300);
        }
        
        this.updateStats();
        
        // Re-render cards after a short delay
        setTimeout(() => {
            this.renderCards();
        }, 300);
    }
    
    resetStack() {
        this.cardStack = [...mockReels];
        this.swipeCount = 0;
        this.updateStats();
        this.renderCards();
        this.showToast('Reset! 🔄', 'Stack refreshed with all reels.');
    }
    
    updateStats() {
        document.getElementById('swipe-count').textContent = this.swipeCount;
        document.getElementById('remaining-count').textContent = this.cardStack.length;
        document.getElementById('saved-count').textContent = this.savedReels.size;
    }
    
    openModal(reelId) {
        const reel = mockReels.find(r => r.id === reelId);
        if (!reel) return;
        
        document.getElementById('modal-title').textContent = reel.title;
        document.getElementById('modal-script').textContent = reel.script;
        document.getElementById('script-modal').style.display = 'flex';
    }
    
    closeModal() {
        document.getElementById('script-modal').style.display = 'none';
    }
    
    showToast(title, description) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-description">${description}</div>
        `;
        
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ViralXApp();
});

// Reset function for empty state button
function resetStack() {
    if (window.app) {
        window.app.resetStack();
    }
}