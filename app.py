from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sacred_arithmetic.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Chargement des données des principes
try:
    with open('data/principles.json', 'r', encoding='utf-8') as f:
        principles_data = json.load(f)
except FileNotFoundError:
    print("Fichier principles.json non trouvé, création d'un dictionnaire vide")
    principles_data = {}

# Chargement des données des portes
try:
    with open('data/portes.json', 'r', encoding='utf-8') as f:
        portes_data = json.load(f)
except FileNotFoundError:
    print("Fichier portes.json non trouvé, création d'un dictionnaire vide")
    portes_data = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/principle/<int:number>')
def principle(number):
    if 1 <= number <= 9:
        principle_data = principles_data[str(number)]
        return render_template(f'principle{number}.html', principle=principle_data)
    return render_template('404.html'), 404

@app.route('/api/meditation/<int:principle_number>', methods=['POST'])
def start_meditation(principle_number):
    if 1 <= principle_number <= 9:
        # Logique pour démarrer la méditation
        return jsonify({
            'status': 'success',
            'message': f'Méditation du principe {principle_number} démarrée'
        })
    return jsonify({'status': 'error', 'message': 'Principe invalide'}), 400

@app.route('/api/exercise/<int:principle_number>', methods=['POST'])
def start_exercise(principle_number):
    if 1 <= principle_number <= 9:
        # Logique pour démarrer l'exercice
        return jsonify({
            'status': 'success',
            'message': f'Exercice du principe {principle_number} démarré'
        })
    return jsonify({'status': 'error', 'message': 'Principe invalide'}), 400

@app.route('/api/initiation/progress', methods=['GET'])
def get_initiation_progress():
    # Logique pour récupérer la progression
    return jsonify({
        'status': 'success',
        'unlocked_principles': ['1']  # À implémenter avec une base de données
    })

@app.route('/porte<int:numero>')
def porte(numero):
    if 1 <= numero <= 9:
        porte_data = portes_data[str(numero)]
        porte_data['numero'] = numero  # Ajout du numéro de la porte
        template_name = f'porte{numero}_'
        if numero == 1:
            template_name += 'conscience.html'
        elif numero == 2:
            template_name += 'equivalence.html'
        elif numero == 3:
            template_name += 'oscillation.html'
        elif numero == 4:
            template_name += 'polarite.html'
        elif numero == 5:
            template_name += 'rythme.html'
        elif numero == 6:
            template_name += 'causalite.html'
        elif numero == 7:
            template_name += 'orientation.html'
        elif numero == 8:
            template_name += 'equilibre.html'
        else:
            template_name += 'divin.html'
        return render_template(template_name, porte=porte_data)
    return render_template('404.html'), 404

@app.route('/arithmetique-sacree')
def arithmetique_sacree():
    return render_template('arithmetique_sacree.html')

@app.route('/cycles-numeriques')
def cycles_numeriques():
    return render_template('cycles_numeriques.html')

@app.route('/principes-hermetiques')
def principes_hermetiques():
    return render_template('principes_hermetiques.html')

@app.route('/geometrie-nombres')
def geometrie_nombres():
    return render_template('geometrie_nombres.html')

@app.route('/frequences-sons')
def frequences_sons():
    return render_template('frequences_sons.html')

@app.route('/outils-interactifs')
def outils_interactifs():
    return render_template('outils_interactifs.html')

@app.route('/livres-savoirs')
def livres_savoirs():
    return render_template('livres_savoirs.html')

@app.route('/communaute-ateliers')
def communaute_ateliers():
    return render_template('communaute_ateliers.html')

@app.route('/soutenir-contribuer')
def soutenir_contribuer():
    return render_template('soutenir_contribuer.html')

@app.route('/lois-hermetiques')
def lois_hermetiques():
    return render_template('lois_hermetiques.html')

@app.route('/enneagramme')
def enneagramme():
    return render_template('enneagramme.html')

@app.route('/geometrie')
def geometrie():
    return render_template('geometrie.html')

@app.route('/gematria', methods=['GET', 'POST'])
def gematria():
    resultat = None
    mot = None
    systeme = None
    
    systemes_gematria = {'latin_simple': {
            'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
            'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18,
            's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
        }
    }
    
    # Dictionnaire d'interprétations des nombres
    interpretations_numerologiques = {
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
        33: "Maître enseignant, service désintéressé, amour inconditionnel",
    }
    
    # Nombres associés à des concepts spirituels spécifiques
    nombres_sacres = {
        13: "Transformation, passage",
        18: "Vie (חי) dans la tradition juive",
        26: "Tétragramme divin YHWH (יהוה)",
        72: "Nom divin, 72 noms de Dieu",
        108: "Nombre sacré dans l'hindouisme et le bouddhisme",
        144: "Perfection spirituelle, 12×12",
        216: "Nom de Dieu à 72 lettres (3×72)",
        666: "Nombre solaire/matériel, nombre de l'homme",
        888: "Christ (Ἰησοῦς) en gématria grecque"
    }
    
    if request.method == 'POST':
        mot = request.form.get('mot', '').lower()
        systeme = request.form.get('systeme', 'latin_simple')
        
        if systeme in systemes_gematria:
            valeurs = systemes_gematria[systeme]
            total = 0
            calcul_detaille = []
            
            for lettre in mot:
                if lettre in valeurs:
                    total += valeurs[lettre]
                    calcul_detaille.append(f"{lettre} ({valeurs[lettre]})")
            
            # Réduction numérique (calcul du nombre réduit)
            nombre_reduit = total
            while nombre_reduit > 9 and nombre_reduit not in [11, 22, 33]:
                nombre_reduit = sum(int(chiffre) for chiffre in str(nombre_reduit))
            
            # Recherche d'interprétations
            interpretation = None
            if total in nombres_sacres:
                interpretation = nombres_sacres[total]
            elif nombre_reduit in interpretations_numerologiques:
                interpretation = interpretations_numerologiques[nombre_reduit]
            
            resultat = {
                'mot': mot,
                'systeme': systeme,
                'valeur': total,
                'calcul_detaille': ' + '.join(calcul_detaille) + f" = {total}",
                'nombre_reduit': nombre_reduit,
                'interpretation': interpretation
            }
    
    return render_template('gematria.html', resultat=resultat, mot=mot, systeme=systeme, systemes=systemes_gematria.keys())

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.getenv('PORT', 8080))
    app.run(
        host='0.0.0.0',
        port=port,
        debug=os.getenv('DEBUG', 'True').lower() == 'true',
        use_reloader=True,
        threaded=True
    ) 