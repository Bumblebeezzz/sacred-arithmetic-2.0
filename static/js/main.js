document.addEventListener('DOMContentLoaded', function() {
    // Empêcher toute redirection non désirée
    const mainTitleLink = document.getElementById('main-title-link');
    if (mainTitleLink) {
        mainTitleLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = '/';
        });
    }

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