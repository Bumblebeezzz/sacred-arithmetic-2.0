# Sacred Arithmetic 2.0

Une application web interactive explorant les principes de l'arithmétique sacrée, les cycles numériques et la géométrie des nombres.

## Fonctionnalités

- Exploration des cycles numériques (mod 9)
- Visualisation de la géométrie des nombres
- Étude des lois hermétiques
- Outils interactifs de calcul
- Interface intuitive avec 9 portails thématiques

## Technologies Utilisées

- Python 3.11
- Flask 3.0
- SQLAlchemy
- HTML5/CSS3
- JavaScript

## Installation

1. Cloner le repository
```bash
git clone https://github.com/votre-username/sacred-arithmetic-2.0.git
cd sacred-arithmetic-2.0
```

2. Créer un environnement virtuel
```bash
python -m venv venv
source venv/bin/activate  # Sur Unix/macOS
# ou
venv\Scripts\activate  # Sur Windows
```

3. Installer les dépendances
```bash
pip install -r requirements.txt
```

4. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer .env avec vos configurations
```

5. Lancer l'application
```bash
python app.py
```

L'application sera accessible à l'adresse `http://localhost:5002`

## Déploiement

L'application est configurée pour être déployée sur Render.com. Voir le fichier `render.yaml` pour les détails de configuration.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 