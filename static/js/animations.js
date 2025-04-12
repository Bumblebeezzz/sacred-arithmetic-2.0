// Fonction pour vérifier si un élément est visible dans la fenêtre
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
        rect.bottom >= 0
    );
}

// Fonction pour ajouter la classe visible aux sections visibles
function handleScroll() {
    document.querySelectorAll('.fade-in-section').forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('visible');
        }
    });
}

// Fonction d'initialisation
function initAnimations() {
    // Ajouter l'écouteur d'événements pour le scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Vérifier les sections visibles au chargement initial
    handleScroll();
    
    // Effet de scintillement aléatoire pour des points particuliers
    document.querySelectorAll('.point-flash').forEach(point => {
        // Délai aléatoire pour que tous les points ne clignotent pas en même temps
        const randomDelay = Math.random() * 2;
        point.style.animationDelay = `${randomDelay}s`;
    });
    
    // Forcer le fond noir très basique (juste la couleur de fond)
    document.body.style.backgroundColor = "#000";
    document.documentElement.style.backgroundColor = "#000";
}

// Fonction pour générer des particules flottantes
function createParticles(container, count = 10) {
    // Vérifier si le conteneur existe
    if (!container) return;
    
    // Vider le conteneur avant de créer de nouvelles particules
    container.innerHTML = '';
    
    // Récupérer les dimensions du conteneur
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Créer les particules
    for (let i = 0; i < count; i++) {
        // Créer l'élément particule
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Déterminer aléatoirement la taille de la particule
        const sizeType = Math.random();
        if (sizeType < 0.7) {
            particle.classList.add('particle-tiny');
        } else if (sizeType < 0.95) {
            particle.classList.add('particle-small');
        } else {
            particle.classList.add('particle-medium');
        }
        
        // Positionner aléatoirement la particule
        const x = Math.random() * width;
        const y = Math.random() * height;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Définir une animation aléatoire pour la particule
        const duration = 15 + Math.random() * 15; // Entre 15 et 30 secondes (réduit)
        const delay = Math.random() * 3; // Entre 0 et 3 secondes (réduit)
        
        // Appliquer l'animation
        particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        // Ajouter la particule au conteneur
        container.appendChild(particle);
    }
}

// Ajouter l'animation de flottement à la feuille de style
function addFloatKeyframes() {
    // Créer une feuille de style pour les keyframes
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes float {
            0% {
                transform: translate(0, 0);
                opacity: 0.1;
            }
            25% {
                transform: translate(5px, 5px);
                opacity: 0.3;
            }
            50% {
                transform: translate(10px, -5px);
                opacity: 0.2;
            }
            75% {
                transform: translate(-5px, 8px);
                opacity: 0.3;
            }
            100% {
                transform: translate(0, 0);
                opacity: 0.1;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Initialiser les particules dans tous les conteneurs
function initParticles() {
    addFloatKeyframes();
    
    // Sélectionner tous les conteneurs de particules
    const containers = document.querySelectorAll('.particles-container');
    containers.forEach(container => {
        // Nombre de particules basé sur la taille du conteneur, mais limité pour les performances
        const area = container.offsetWidth * container.offsetHeight;
        const count = Math.min(Math.max(Math.floor(area / 20000), 5), 20); // Réduit de 10-50 à 5-20
        
        createParticles(container, count);
    });
}

// Forcer le fond noir partout
function forceBlackBackground() {
    document.body.style.backgroundColor = "#000";
    document.documentElement.style.backgroundColor = "#000";
    
    // Ajouter un observateur pour détecter les éléments gris
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const element = mutation.target;
                const computedStyle = window.getComputedStyle(element);
                const backgroundColor = computedStyle.backgroundColor;
                
                // Si le fond est gris, le rendre noir ou transparent
                if (backgroundColor.includes('rgb(') && !backgroundColor.includes('0, 0, 0') && !backgroundColor.includes('rgba(0, 0, 0, 0)')) {
                    element.style.backgroundColor = 'transparent';
                }
            }
        });
    });
    
    observer.observe(document.body, { 
        attributes: true,
        attributeFilter: ['style'],
        subtree: true,
        childList: true
    });
}

// Ajouter l'initialisation des particules
function initAllEffects() {
    initAnimations();
    // Limiter les particules pour améliorer les performances
    // initParticles(); // Commenté pour éviter la surcharge
    
    // Force le fond noir
    forceBlackBackground();
}

// Initialiser les animations une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', initAnimations);

document.addEventListener('DOMContentLoaded', function() {
    // Animation du vortex numérique pour la page cycles-numeriques
    function drawVortex(canvasId, numbers) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        
        // Nettoyer le canvas
        ctx.clearRect(0, 0, width, height);
        
        // Dessiner un cercle extérieur
        ctx.beginPath();
        ctx.arc(centerX, centerY, Math.min(width, height) / 2.2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Dessiner les points et les lignes pour les nombres
        const points = [];
        const numPoints = numbers.length;
        const radius = Math.min(width, height) / 2.5;
        
        // Calculer les coordonnées des points
        for (let i = 0; i < numPoints; i++) {
            const angle = (i * 2 * Math.PI / numPoints) - Math.PI / 2; // Commencer en haut
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            points.push({ x, y, number: numbers[i] });
        }
        
        // Dessiner les lignes entre les points dans l'ordre de la séquence
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        
        // Fermer le chemin si nécessaire
        if (numPoints > 2) {
            ctx.lineTo(points[0].x, points[0].y);
        }
        
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Dessiner les points et les nombres
        points.forEach(point => {
            // Cercle
            ctx.beginPath();
            ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.9)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Nombre
            ctx.font = 'bold 18px Arial';
            ctx.fillStyle = 'rgb(255, 215, 0)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(point.number, point.x, point.y);
        });
    }
    
    // Fonction pour générer un cycle de nombres
    function generateCycle(base) {
        const cycle = [];
        let current = base;
        
        // Ajouter le premier nombre
        cycle.push(current);
        
        // Générer le cycle jusqu'à ce qu'on revienne au début
        do {
            current = (current * base) % 9 || 9; // si le résultat est 0, on met 9
            cycle.push(current);
            
            // Éviter les boucles infinies
            if (cycle.length > 9) break;
        } while (current !== base);
        
        return cycle;
    }
    
    // Exposer les fonctions au scope global si elles sont nécessaires ailleurs
    window.drawVortex = drawVortex;
    window.generateCycle = generateCycle;
    
    // Initialiser le vortex si le canvas est présent
    const cycleCanvas = document.getElementById('cycle-canvas');
    if (cycleCanvas) {
        // Dessiner un vortex vide par défaut
        drawVortex('cycle-canvas', [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
    
    const vortexCanvas = document.getElementById('vortex-canvas');
    if (vortexCanvas) {
        // Dessiner un vortex par défaut
        drawVortex('vortex-canvas', [3, 6, 9]);
    }
    
    // Initialiser le générateur de vortex
    window.generateVortex = function() {
        const select = document.getElementById('vortex-input');
        if (!select) return;
        
        const type = select.value;
        let numbers;
        
        switch(type) {
            case '369':
                numbers = [3, 6, 9];
                break;
            case '142857':
                numbers = [1, 4, 2, 8, 5, 7];
                break;
            case '124875':
                numbers = [1, 2, 4, 8, 7, 5];
                break;
            default:
                numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
        
        drawVortex('vortex-canvas', numbers);
    };
    
    // Support pour les significations numérologiques
    window.highlightNumber = function(number) {
        const cells = document.querySelectorAll('.number-cell');
        cells.forEach(cell => cell.classList.remove('active'));
        
        const activeCell = document.querySelector(`.number-cell:nth-child(${number})`);
        if (activeCell) activeCell.classList.add('active');
        
        // Afficher les informations
        const infoDiv = document.getElementById('number-info');
        if (!infoDiv) return;
        
        const meanings = {
            1: "Principe de Conscience - L'unité fondamentale, le commencement, la source primordiale.",
            2: "Principe d'Équivalence - La dualité, la réflexion, l'équilibre des forces opposées.",
            3: "Principe d'Oscillation - La trinité créatrice, l'harmonie et le rythme.",
            4: "Principe de Polarité - La stabilité, la structure, la fondation matérielle.",
            5: "Principe de Rythme - Le changement, la liberté, l'adaptation et le mouvement.",
            6: "Principe de Causalité - L'harmonie, la responsabilité, l'équilibre et la guérison.",
            7: "Principe d'Orientation - Le mystère, la spiritualité, la sagesse intérieure.",
            8: "Principe d'Équilibre - L'abondance, l'infini et la maîtrise matérielle.",
            9: "Principe Divin - La complétude, la compassion universelle, le retour à l'unité."
        };
        
        infoDiv.innerHTML = `
            <h3>Le Nombre ${number}</h3>
            <p>${meanings[number] || ""}</p>
            <div class="cycles">
                <h4>Cycle de puissance</h4>
                <div class="cycle-display">${generateCycle(number).join(' → ')}</div>
            </div>
        `;
        
        infoDiv.style.display = 'block';
    };
    
    // Support pour les calculateurs de dates de naissance en gématrie
    const birthDateInput = document.getElementById('birth-date');
    const calculateBirthBtn = document.getElementById('calculate-birth');
    
    if (birthDateInput && calculateBirthBtn) {
        calculateBirthBtn.addEventListener('click', function() {
            const birthDate = birthDateInput.value;
            if (!birthDate) {
                alert('Veuillez entrer une date de naissance');
                return;
            }
            
            // Extraire jour, mois, année
            const [year, month, day] = birthDate.split('-').map(Number);
            
            // Calculer la somme des chiffres
            const dateString = `${day}${month}${year}`;
            const total = Array.from(dateString, Number).reduce((a, b) => a + b, 0);
            
            // Réduction numérique
            let reducedNumber = total;
            const steps = [];
            
            if (reducedNumber > 9 && ![11, 22, 33].includes(reducedNumber)) {
                const digits = Array.from(String(reducedNumber), Number);
                steps.push(digits.join(' + '));
                reducedNumber = digits.reduce((a, b) => a + b, 0);
                
                // Si encore > 9, réduire à nouveau
                if (reducedNumber > 9 && ![11, 22, 33].includes(reducedNumber)) {
                    const finalDigits = Array.from(String(reducedNumber), Number);
                    steps.push(finalDigits.join(' + '));
                    reducedNumber = finalDigits.reduce((a, b) => a + b, 0);
                }
            }
            
            // Afficher les résultats
            document.getElementById('birth-date-display').textContent = new Date(birthDate).toLocaleDateString('fr-FR');
            document.getElementById('birth-value').textContent = total;
            document.getElementById('birth-details').textContent = `${day} + ${month} + ${year} = ${total}`;
            if (steps.length > 0) {
                document.getElementById('birth-details').textContent += ` → ${steps.join(' → ')} = ${reducedNumber}`;
            }
            document.getElementById('birth-reduced').textContent = reducedNumber;
            
            // Interprétation
            const interpretations = {
                1: "Unité, leadership, indépendance",
                2: "Dualité, équilibre, harmonie, coopération",
                3: "Trinité, créativité, expression, joie",
                4: "Stabilité, ordre, structure, travail",
                5: "Changement, liberté, adaptation, voyages",
                6: "Harmonie, responsabilité, amour, guérison",
                7: "Mystère, spiritualité, sagesse, introspection",
                8: "Pouvoir, abondance, réalisation",
                9: "Accomplissement, humanitarisme, compassion",
                11: "Illumination, intuition, idéalisme",
                22: "Maître bâtisseur, manifestation",
                33: "Maître enseignant, service désintéressé"
            };
            
            document.getElementById('birth-meaning').textContent = interpretations[reducedNumber] || "Nombre personnel unique";
            document.getElementById('birth-result').style.display = 'block';
        });
    }
}); 