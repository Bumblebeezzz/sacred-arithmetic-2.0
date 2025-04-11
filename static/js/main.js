document.addEventListener('DOMContentLoaded', function() {
    // Animation du menu
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Gestion des tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);

            const rect = this.getBoundingClientRect();
            tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
            tooltipElement.style.left = `${rect.left + (rect.width - tooltipElement.offsetWidth) / 2}px`;
        });

        tooltip.addEventListener('mouseleave', function() {
            document.querySelector('.tooltip').remove();
        });
    });

    // Animation des cartes
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    // Gestion du menu des portails
    const siteTitle = document.querySelector('.site-title');
    const portalMenu = document.querySelector('.portal-menu');
    const closeMenu = document.querySelector('.close-menu');
    let menuTimeout;

    // Ouvrir le menu au survol du titre
    siteTitle.addEventListener('mouseenter', () => {
        clearTimeout(menuTimeout);
        portalMenu.classList.add('open');
    });

    // Gérer le survol du menu
    portalMenu.addEventListener('mouseenter', () => {
        clearTimeout(menuTimeout);
    });

    // Fermer le menu quand la souris quitte la zone
    portalMenu.addEventListener('mouseleave', () => {
        menuTimeout = setTimeout(() => {
            portalMenu.classList.remove('open');
        }, 300);
    });

    // Fermer le menu au clic
    portalMenu.addEventListener('click', (e) => {
        if (e.target === portalMenu || e.target.classList.contains('close-menu')) {
            portalMenu.classList.remove('open');
        }
    });

    // Animation séquentielle des portails
    const portals = document.querySelectorAll('.portal-menu .portal');
    portals.forEach((portal, index) => {
        portal.style.setProperty('--portal-index', index);
    });
});

// Fonction pour calculer le mod 9
function calculateMod9(number) {
    return number % 9 || 9;
}

// Fonction pour générer un cycle
function generateCycle(startNumber) {
    const cycle = [];
    let current = startNumber;
    
    do {
        cycle.push(current);
        current = calculateMod9(current * 2);
    } while (current !== startNumber && cycle.length < 9);
    
    return cycle;
}

// Fonction pour dessiner un vortex
function drawVortex(canvasId, numbers) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    numbers.forEach((num, index) => {
        const angle = (index / numbers.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
        
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(num, x, y);
    });
} 