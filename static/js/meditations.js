class MeditationManager {
    constructor() {
        this.currentPrinciple = null;
        this.meditationTimer = null;
        this.breathingPattern = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeMeditationTools();
    }

    setupEventListeners() {
        // Gestion des boutons de méditation
        document.querySelectorAll('.start-meditation').forEach(button => {
            button.addEventListener('click', () => this.startMeditation(button.dataset.principle));
        });

        // Gestion des exercices interactifs
        document.querySelectorAll('.interactive-exercise').forEach(exercise => {
            exercise.addEventListener('click', () => this.startExercise(exercise.dataset.type));
        });
    }

    initializeMeditationTools() {
        // Initialisation des outils de méditation selon le principe
        this.meditationTools = {
            '1': this.createConsciousnessMeditation(),
            '2': this.createEquivalenceMeditation(),
            '3': this.createOscillationMeditation(),
            '4': this.createPolarityMeditation(),
            '5': this.createRhythmMeditation(),
            '6': this.createCausalityMeditation(),
            '7': this.createOrientationMeditation(),
            '8': this.createBalanceMeditation(),
            '9': this.createDivineMeditation()
        };
    }

    startMeditation(principle) {
        this.currentPrinciple = principle;
        const tool = this.meditationTools[principle];
        
        if (tool) {
            tool.start();
        }
    }

    createConsciousnessMeditation() {
        return {
            start: () => {
                // Création du visualiseur de point lumineux
                const container = document.createElement('div');
                container.className = 'meditation-visualizer';
                container.style.width = '300px';
                container.style.height = '300px';
                container.style.position = 'relative';
                container.style.margin = '0 auto';
                container.style.backgroundColor = 'var(--color-black)';
                container.style.border = '2px solid var(--color-gold)';
                container.style.borderRadius = '15px';

                const point = document.createElement('div');
                point.className = 'consciousness-point';
                point.style.width = '20px';
                point.style.height = '20px';
                point.style.backgroundColor = 'var(--color-gold)';
                point.style.borderRadius = '50%';
                point.style.position = 'absolute';
                point.style.top = '50%';
                point.style.left = '50%';
                point.style.transform = 'translate(-50%, -50%)';
                point.style.boxShadow = '0 0 20px var(--color-gold-glow)';
                point.style.animation = 'pulse 2s infinite';

                container.appendChild(point);
                document.querySelector('.meditation-section').appendChild(container);

                // Animation du point
                let scale = 1;
                setInterval(() => {
                    scale = scale === 1 ? 1.2 : 1;
                    point.style.transform = `translate(-50%, -50%) scale(${scale})`;
                }, 2000);
            }
        };
    }

    createEquivalenceMeditation() {
        return {
            start: () => {
                // Création du miroir numérique
                const container = document.createElement('div');
                container.className = 'equivalence-mirror';
                container.style.width = '300px';
                container.style.height = '300px';
                container.style.position = 'relative';
                container.style.margin = '0 auto';
                container.style.backgroundColor = 'var(--color-black)';
                container.style.border = '2px solid var(--color-gold)';
                container.style.borderRadius = '15px';

                const input = document.createElement('input');
                input.type = 'number';
                input.min = '1';
                input.max = '9';
                input.style.width = '100px';
                input.style.margin = '20px auto';
                input.style.display = 'block';
                input.style.textAlign = 'center';
                input.style.backgroundColor = 'var(--color-black)';
                input.style.color = 'var(--color-gold)';
                input.style.border = '1px solid var(--color-gold)';
                input.style.borderRadius = '5px';
                input.style.padding = '10px';

                const result = document.createElement('div');
                result.style.color = 'var(--color-gold)';
                result.style.textAlign = 'center';
                result.style.fontSize = '2rem';
                result.style.marginTop = '20px';

                input.addEventListener('input', (e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 1 && value <= 9) {
                        const mirrorValue = 10 - value;
                        result.textContent = mirrorValue;
                    }
                });

                container.appendChild(input);
                container.appendChild(result);
                document.querySelector('.meditation-section').appendChild(container);
            }
        };
    }

    createOscillationMeditation() {
        return {
            start: () => {
                // Création de l'animation rythmique 3-6-9
                const container = document.createElement('div');
                container.className = 'oscillation-rhythm';
                container.style.width = '300px';
                container.style.height = '300px';
                container.style.position = 'relative';
                container.style.margin = '0 auto';
                container.style.backgroundColor = 'var(--color-black)';
                container.style.border = '2px solid var(--color-gold)';
                container.style.borderRadius = '15px';

                const numbers = [3, 6, 9];
                numbers.forEach((num, index) => {
                    const number = document.createElement('div');
                    number.textContent = num;
                    number.style.color = 'var(--color-gold)';
                    number.style.fontSize = '2rem';
                    number.style.position = 'absolute';
                    number.style.top = `${(index + 1) * 25}%`;
                    number.style.left = '50%';
                    number.style.transform = 'translate(-50%, -50%)';
                    number.style.animation = `bounce ${(index + 1) * 0.5}s infinite`;

                    container.appendChild(number);
                });

                document.querySelector('.meditation-section').appendChild(container);
            }
        };
    }

    // ... Autres méthodes de méditation pour les principes 4-9 ...
}

// Initialisation du gestionnaire de méditation
document.addEventListener('DOMContentLoaded', () => {
    new MeditationManager();
}); 