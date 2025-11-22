// ========================================
// Mobile Navigation Toggle
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    
    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle nav menu
            navMenu.classList.toggle('active');
            
            // No animation - static display
        });
    }
    
    // Toggle submenus on mobile
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const submenu = this.nextElementSibling;
            const parent = this.closest('.has-submenu');
            
            if (submenu) {
                const isOpen = submenu.style.display === 'block';
                submenu.style.display = isOpen ? 'none' : 'block';
                parent.classList.toggle('open');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuToggle && navMenu) {
            const isClickInside = navMenu.contains(e.target) || 
                                 mobileMenuToggle.contains(e.target);
            
            if (!isClickInside && navMenu.classList.contains('active')) {
                mobileMenuToggle.click();
            }
        }
    });
    
    // Close mobile menu on window resize (if desktop view)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                // No animation reset needed
            }
        }
    });
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '#!') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculate offset for sticky header
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'auto'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    document.querySelector('.mobile-menu-toggle')?.click();
                }
            }
        });
    });
});

// ========================================
// Search Form Enhancement
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('#search-input');
    
    if (searchForm && searchInput) {
        // Handle form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const query = searchInput.value.trim();
            if (query) {
                // In a real implementation, you'd redirect to search results
                // For now, we'll just log it
                console.log('Search query:', query);
                // window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        });
        
        // Add focus state management
        searchInput.addEventListener('focus', function() {
            searchForm.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            searchForm.classList.remove('focused');
        });
    }
});

// ========================================
// Intersection Observer for Animations - DISABLED
// ========================================

// Animations removed for instant display

// ========================================
// Keyboard Navigation Enhancement
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Improve keyboard navigation for cards
    const cards = document.querySelectorAll('.favorite-card, .post-item');
    
    cards.forEach(card => {
        const link = card.querySelector('a');
        
        if (link) {
            // Make card keyboard accessible
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'article');
            
            card.addEventListener('keydown', function(e) {
                // Enter or Space key
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
            
            // Add hover effect on keyboard focus
            card.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--color-secondary)';
                this.style.outlineOffset = '2px';
            });
            
            card.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        }
    });
});

// ========================================
// Lazy Loading Images (if needed in future)
// ========================================

// This can be expanded if images are added later
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// Performance: Debounce Function
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll events if needed
const handleScroll = debounce(function() {
    // Add scroll-based functionality here if needed
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });

