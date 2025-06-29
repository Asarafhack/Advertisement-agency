// Global variables
let campaigns = [
    {
        id: 1,
        name: "Summer Fashion Campaign",
        category: "digital",
        budget: 5000,
        duration: 30,
        status: "active",
        impressions: 125000,
        clicks: 3200,
        ctr: 2.56,
        description: "Promote summer fashion collection with vibrant visuals"
    },
    {
        id: 2,
        name: "Tech Product Launch",
        category: "broadcast",
        budget: 15000,
        duration: 45,
        status: "active",
        impressions: 450000,
        clicks: 12500,
        ctr: 2.78,
        description: "Launch campaign for new tech product with TV and radio ads"
    },
    {
        id: 3,
        name: "Local Restaurant Promo",
        category: "print",
        budget: 2500,
        duration: 20,
        status: "paused",
        impressions: 75000,
        clicks: 1800,
        ctr: 2.40,
        description: "Local newspaper and magazine ads for restaurant promotion"
    }
];

let availableAds = [
    {
        id: 101,
        title: "Premium Digital Billboard Space",
        category: "digital",
        price: 2500,
        duration: "30 days",
        location: "Times Square, NYC",
        impressions: "2.5M daily",
        description: "High-traffic digital billboard in prime Manhattan location"
    },
    {
        id: 102,
        title: "Radio Prime Time Slot",
        category: "broadcast",
        price: 1800,
        duration: "15 days",
        location: "FM 101.5",
        impressions: "500K daily",
        description: "Morning drive time radio advertisement slot"
    },
    {
        id: 103,
        title: "Magazine Full Page Ad",
        category: "print",
        price: 3200,
        duration: "Monthly",
        location: "Business Weekly",
        impressions: "250K readers",
        description: "Full page advertisement in premium business magazine"
    },
    {
        id: 104,
        title: "Bus Stop Advertisement",
        category: "outdoor",
        price: 800,
        duration: "60 days",
        location: "Downtown District",
        impressions: "50K daily",
        description: "Eye-catching bus stop display advertisement"
    },
    {
        id: 105,
        title: "Social Media Sponsored Post",
        category: "digital",
        price: 1200,
        duration: "7 days",
        location: "Instagram & Facebook",
        impressions: "1M reach",
        description: "Sponsored post across major social media platforms"
    },
    {
        id: 106,
        title: "TV Commercial Slot",
        category: "broadcast",
        price: 5500,
        duration: "30 days",
        location: "Channel 7 News",
        impressions: "800K viewers",
        description: "30-second commercial during evening news"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize navigation
    initializeNavigation();
    
    // Load dashboard data
    loadDashboardStats();
    loadCampaignsTable();
    
    // Load marketplace ads
    loadMarketplaceAds();
    
    // Initialize forms
    initializeForms();
    
    // Start animations
    startAnimations();
}

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });

    // Add navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Dashboard functionality
function loadDashboardStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = formatNumber(Math.floor(current));
    }, 20);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function loadCampaignsTable() {
    const tableBody = document.querySelector('#campaignsTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    campaigns.forEach(campaign => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div>
                    <strong>${campaign.name}</strong>
                    <br>
                    <small style="color: #666;">${campaign.description}</small>
                </div>
            </td>
            <td>
                <span class="status-badge status-${campaign.status}">
                    ${campaign.status}
                </span>
            </td>
            <td>$${campaign.budget.toLocaleString()}</td>
            <td>${campaign.impressions.toLocaleString()}</td>
            <td>${campaign.ctr}%</td>
            <td>
                <button class="action-btn edit" onclick="editCampaign(${campaign.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteCampaign(${campaign.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Marketplace functionality
function loadMarketplaceAds() {
    const adsGrid = document.getElementById('adsGrid');
    if (!adsGrid) return;

    displayAds(availableAds);
    
    // Initialize filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter ads
            const category = this.getAttribute('data-category');
            const filteredAds = category === 'all' 
                ? availableAds 
                : availableAds.filter(ad => ad.category === category);
            
            displayAds(filteredAds);
        });
    });

    // Initialize search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredAds = availableAds.filter(ad => 
                ad.title.toLowerCase().includes(searchTerm) ||
                ad.description.toLowerCase().includes(searchTerm) ||
                ad.category.toLowerCase().includes(searchTerm)
            );
            displayAds(filteredAds);
        });
    }
}

function displayAds(ads) {
    const adsGrid = document.getElementById('adsGrid');
    if (!adsGrid) return;

    adsGrid.innerHTML = '';
    
    ads.forEach(ad => {
        const adCard = document.createElement('div');
        adCard.className = 'ad-card';
        adCard.innerHTML = `
            <div class="ad-image">
                <i class="fas fa-${getAdIcon(ad.category)}"></i>
            </div>
            <div class="ad-content">
                <span class="ad-category">${ad.category}</span>
                <h3 class="ad-title">${ad.title}</h3>
                <p class="ad-description">${ad.description}</p>
                <div class="ad-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${ad.location}</span>
                    <span><i class="fas fa-eye"></i> ${ad.impressions}</span>
                </div>
                <div class="ad-price">$${ad.price}</div>
                <button class="buy-btn" onclick="buyAd(${ad.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Purchase Ad Space
                </button>
            </div>
        `;
        adsGrid.appendChild(adCard);
    });
}

function getAdIcon(category) {
    const icons = {
        'digital': 'desktop',
        'print': 'newspaper',
        'broadcast': 'broadcast-tower',
        'outdoor': 'road'
    };
    return icons[category] || 'ad';
}

// Modal functionality
function openCreateAdModal() {
    const modal = document.getElementById('createAdModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCreateAdModal() {
    const modal = document.getElementById('createAdModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('createAdForm').reset();
    }
}

function buyAd(adId) {
    const ad = availableAds.find(a => a.id === adId);
    if (!ad) return;

    const modal = document.getElementById('buyAdModal');
    const content = document.getElementById('buyAdContent');
    
    if (modal && content) {
        content.innerHTML = `
            <div class="ad-purchase-details">
                <h3>${ad.title}</h3>
                <p>${ad.description}</p>
                <div class="purchase-info">
                    <div class="info-item">
                        <strong>Category:</strong> ${ad.category}
                    </div>
                    <div class="info-item">
                        <strong>Location:</strong> ${ad.location}
                    </div>
                    <div class="info-item">
                        <strong>Duration:</strong> ${ad.duration}
                    </div>
                    <div class="info-item">
                        <strong>Expected Impressions:</strong> ${ad.impressions}
                    </div>
                    <div class="info-item">
                        <strong>Price:</strong> <span style="font-size: 1.5rem; color: #0066FF;">$${ad.price}</span>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeBuyAdModal()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="confirmPurchase(${ad.id})">
                        <i class="fas fa-credit-card"></i>
                        Confirm Purchase
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBuyAdModal() {
    const modal = document.getElementById('buyAdModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function confirmPurchase(adId) {
    const ad = availableAds.find(a => a.id === adId);
    if (ad) {
        showNotification(`Successfully purchased "${ad.title}" for $${ad.price}!`, 'success');
        closeBuyAdModal();
        
        // Add to campaigns (simulate)
        const newCampaign = {
            id: campaigns.length + 1,
            name: ad.title,
            category: ad.category,
            budget: ad.price,
            duration: parseInt(ad.duration),
            status: 'active',
            impressions: 0,
            clicks: 0,
            ctr: 0,
            description: ad.description
        };
        
        campaigns.push(newCampaign);
        loadCampaignsTable();
    }
}

// Form handling
function initializeForms() {
    const createAdForm = document.getElementById('createAdForm');
    const contactForm = document.getElementById('contactForm');

    if (createAdForm) {
        createAdForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCreateCampaign();
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }
}

function handleCreateCampaign() {
    const formData = new FormData(document.getElementById('createAdForm'));
    
    const newCampaign = {
        id: campaigns.length + 1,
        name: formData.get('campaignName'),
        category: formData.get('campaignCategory'),
        budget: parseInt(formData.get('campaignBudget')),
        duration: parseInt(formData.get('campaignDuration')),
        status: 'active',
        impressions: 0,
        clicks: 0,
        ctr: 0,
        description: formData.get('campaignDescription')
    };
    
    campaigns.push(newCampaign);
    loadCampaignsTable();
    closeCreateAdModal();
    showNotification(`Campaign "${newCampaign.name}" created successfully!`, 'success');
}

function handleContactForm() {
    const formData = new FormData(document.getElementById('contactForm'));
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
    }, 1000);
}

// Campaign management
function editCampaign(id) {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
        // Pre-fill the create campaign form with existing data
        document.getElementById('campaignName').value = campaign.name;
        document.getElementById('campaignCategory').value = campaign.category;
        document.getElementById('campaignBudget').value = campaign.budget;
        document.getElementById('campaignDuration').value = campaign.duration;
        document.getElementById('campaignDescription').value = campaign.description;
        
        openCreateAdModal();
        
        // Change form behavior to edit mode
        const form = document.getElementById('createAdForm');
        form.onsubmit = function(e) {
            e.preventDefault();
            updateCampaign(id);
        };
    }
}

function updateCampaign(id) {
    const formData = new FormData(document.getElementById('createAdForm'));
    const campaignIndex = campaigns.findIndex(c => c.id === id);
    
    if (campaignIndex !== -1) {
        campaigns[campaignIndex] = {
            ...campaigns[campaignIndex],
            name: formData.get('campaignName'),
            category: formData.get('campaignCategory'),
            budget: parseInt(formData.get('campaignBudget')),
            duration: parseInt(formData.get('campaignDuration')),
            description: formData.get('campaignDescription')
        };
        
        loadCampaignsTable();
        closeCreateAdModal();
        showNotification('Campaign updated successfully!', 'success');
        
        // Reset form behavior
        document.getElementById('createAdForm').onsubmit = function(e) {
            e.preventDefault();
            handleCreateCampaign();
        };
    }
}

function deleteCampaign(id) {
    if (confirm('Are you sure you want to delete this campaign?')) {
        campaigns = campaigns.filter(c => c.id !== id);
        loadCampaignsTable();
        showNotification('Campaign deleted successfully!', 'success');
    }
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notificationMessage');
    
    if (notification && messageElement) {
        messageElement.textContent = message;
        notification.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            closeNotification();
        }, 5000);
    }
}

function closeNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.remove('show');
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animations
function startAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationDelay = `${Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1}s`;
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .ad-card, .pricing-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Add some dynamic interactions
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.0005;
        const x = e.clientX * speed;
        const y = e.clientY * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add loading states for buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') || e.target.classList.contains('buy-btn')) {
        const originalText = e.target.innerHTML;
        e.target.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        e.target.disabled = true;
        
        setTimeout(() => {
            e.target.innerHTML = originalText;
            e.target.disabled = false;
        }, 2000);
    }
});

// Add smooth hover effects for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .ad-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Preloader simulation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Start counter animations after page load
    setTimeout(() => {
        loadDashboardStats();
    }, 500);
});