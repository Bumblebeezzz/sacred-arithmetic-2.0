// Gestion du mode parcours initiatique
class InitiationMode {
    constructor() {
        this.isActive = false;
        this.unlockedPortals = new Set(['1']); // Le premier portail est toujours déverrouillé
        this.audioEnabled = false;
        this.audioContext = null;
        this.backgroundMusic = null;
        
        this.init();
    }

    init() {
        // Initialisation des contrôles
        this.createControls();
        this.setupEventListeners();
        this.updatePortalStates();
    }

    createControls() {
        // Création du bouton de mode initiation
        const initiationToggle = document.createElement('button');
        initiationToggle.className = 'initiation-toggle';
        initiationToggle.textContent = 'Mode Initiation';
        initiationToggle.id = 'initiation-toggle';
        
        // Création du contrôle audio
        const audioToggle = document.createElement('button');
        audioToggle.className = 'audio-toggle';
        audioToggle.innerHTML = '🔊';
        audioToggle.id = 'audio-toggle';
        
        // Ajout des contrôles au DOM
        const initiationContainer = document.createElement('div');
        initiationContainer.className = 'initiation-mode';
        initiationContainer.appendChild(initiationToggle);
        
        const audioContainer = document.createElement('div');
        audioContainer.className = 'audio-control';
        audioContainer.appendChild(audioToggle);
        
        document.body.appendChild(initiationContainer);
        document.body.appendChild(audioContainer);
    }

    setupEventListeners() {
        // Gestion du mode initiation
        document.getElementById('initiation-toggle').addEventListener('click', () => {
            this.isActive = !this.isActive;
            this.updatePortalStates();
            this.updateToggleState();
        });

        // Gestion de l'audio
        document.getElementById('audio-toggle').addEventListener('click', () => {
            this.toggleAudio();
        });

        // Gestion des clics sur les portails
        document.querySelectorAll('.portal').forEach(portal => {
            portal.addEventListener('click', (e) => {
                if (this.isActive && !this.unlockedPortals.has(portal.dataset.number)) {
                    e.preventDefault();
                    this.showLockedMessage(portal);
                }
            });
        });
    }

    updatePortalStates() {
        document.querySelectorAll('.portal').forEach(portal => {
            if (this.isActive && !this.unlockedPortals.has(portal.dataset.number)) {
                portal.classList.add('locked');
            } else {
                portal.classList.remove('locked');
            }
        });
    }

    updateToggleState() {
        const toggle = document.getElementById('initiation-toggle');
        toggle.style.backgroundColor = this.isActive ? 'var(--color-gold)' : 'var(--color-black)';
        toggle.style.color = this.isActive ? 'var(--color-black)' : 'var(--color-gold)';
    }

    showLockedMessage(portal) {
        // Création d'un message temporaire
        const message = document.createElement('div');
        message.className = 'locked-message';
        message.textContent = 'Débloquez les portails précédents pour accéder à celui-ci';
        message.style.position = 'absolute';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.padding = '1rem';
        message.style.background = 'var(--color-black)';
        message.style.border = '2px solid var(--color-gold)';
        message.style.borderRadius = '10px';
        message.style.color = 'var(--color-gold)';
        message.style.zIndex = '1000';
        
        portal.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    toggleAudio() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (!this.backgroundMusic) {
            // Création d'une musique d'ambiance simple
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            this.backgroundMusic = oscillator;
        }

        if (this.audioEnabled) {
            this.backgroundMusic.stop();
            this.audioEnabled = false;
            document.getElementById('audio-toggle').innerHTML = '🔊';
        } else {
            this.backgroundMusic.start();
            this.audioEnabled = true;
            document.getElementById('audio-toggle').innerHTML = '🔈';
        }
    }
}

// Initialisation du mode initiation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new InitiationMode();
}); 