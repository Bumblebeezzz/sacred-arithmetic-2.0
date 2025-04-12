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

    // Fonctions pour Cycles Numériques
    window.calculateDigitalRoot = function(number) {
        let num = parseInt(number);
        if (isNaN(num)) return null;
        
        // Réduction digitale
        while (num > 9 && ![11, 22, 33].includes(num)) {
            num = Array.from(String(num), Number).reduce((a, b) => a + b, 0);
        }
        
        return num;
    };
    
    window.getReductionSteps = function(number) {
        let num = parseInt(number);
        if (isNaN(num)) return [];
        
        let steps = [];
        let currentNum = num;
        
        while (currentNum > 9 && ![11, 22, 33].includes(currentNum)) {
            const digits = Array.from(String(currentNum), Number);
            const sum = digits.reduce((a, b) => a + b, 0);
            steps.push({
                calculation: digits.join(' + '),
                result: sum
            });
            currentNum = sum;
        }
        
        return steps;
    };
    
    // Support pour l'explorateur de cycles
    window.exploreCycle = function() {
        const input = document.getElementById('cycle-input');
        if (!input) return;
        
        const number = parseInt(input.value);
        if (isNaN(number) || number < 1) {
            alert('Veuillez entrer un nombre valide supérieur à 0');
            return;
        }
        
        const cycleResult = document.getElementById('cycle-result');
        if (!cycleResult) return;
        
        const steps = getReductionSteps(number);
        const finalNumber = calculateDigitalRoot(number);
        
        let html = `
            <div class="cycle-step">
                <strong>Nombre initial :</strong> ${number}
            </div>
        `;
        
        steps.forEach((step, index) => {
            html += `
                <div class="cycle-step">
                    <strong>Étape ${index + 1} :</strong> ${step.calculation} = ${step.result}
                </div>
            `;
        });
        
        html += `
            <div class="cycle-final">
                <h3>Nombre Racine</h3>
                <div class="number">${finalNumber}</div>
            </div>
        `;
        
        cycleResult.innerHTML = html;
        cycleResult.classList.add('active');
    };
    
    // Fonctions pour la Gématrie
    window.calculateGematria = function() {
        const nameInput = document.getElementById('nameInput');
        if (!nameInput) return;
        
        const name = nameInput.value.toLowerCase();
        if (!name) {
            alert('Veuillez entrer un nom ou un mot');
            return;
        }
        
        // Système latin simple A=1, B=2, etc.
        const values = {};
        for (let i = 0; i < 26; i++) {
            values[String.fromCharCode(97 + i)] = i + 1;
        }
        
        let total = 0;
        let details = [];
        
        for (let char of name) {
            if (values[char]) {
                total += values[char];
                details.push(`${char} (${values[char]})`);
            }
        }
        
        // Réduction numérique
        let rootNumber = total;
        while (rootNumber > 9 && ![11, 22, 33].includes(rootNumber)) {
            rootNumber = Array.from(String(rootNumber), Number).reduce((a, b) => a + b, 0);
        }
        
        // Afficher les résultats
        document.getElementById('name-value').textContent = name;
        document.getElementById('gematria-value').textContent = total;
        document.getElementById('gematria-details').textContent = details.join(' + ') + ' = ' + total;
        document.getElementById('root-number').textContent = rootNumber;
        
        // Interprétation
        const interpretations = {
            1: "Unité, commencement, leadership, indépendance",
            2: "Dualité, équilibre, harmonie, coopération",
            3: "Trinité, créativité, expression, croissance",
            4: "Stabilité, ordre, structure, fondation",
            5: "Changement, liberté, adaptation, voyages",
            6: "Harmonie, responsabilité, amour, guérison",
            7: "Mystère, spiritualité, sagesse, introspection",
            8: "Pouvoir, abondance, infini, réalisation",
            9: "Accomplissement, humanitarisme, compassion, universalité",
            11: "Illumination, intuition, idéalisme, inspiration",
            22: "Maître bâtisseur, manifestation, pouvoir spirituel",
            33: "Maître enseignant, service désintéressé, amour inconditionnel"
        };
        
        document.getElementById('gematria-meaning').textContent = interpretations[rootNumber] || "Nombre personnel unique";
        document.getElementById('gematria-result').style.display = 'block';
    };
    
    // Initialisation des calculateurs si présents sur la page
    const gematriaForm = document.getElementById('gematriaForm');
    if (gematriaForm) {
        gematriaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateGematria();
        });
    }
    
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const cycleInput = document.getElementById('cycle-input');
            if (cycleInput) {
                exploreCycle();
            }
        });
    }
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