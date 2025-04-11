from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import os
from dotenv import load_dotenv

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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/porte1')
def porte1():
    return render_template('porte1_conscience.html')

@app.route('/porte2')
def porte2():
    return render_template('porte2_equivalence.html')

@app.route('/porte3')
def porte3():
    return render_template('porte3_oscillation.html')

@app.route('/porte4')
def porte4():
    return render_template('porte4_polarite.html')

@app.route('/porte5')
def porte5():
    return render_template('porte5_rythme.html')

@app.route('/porte6')
def porte6():
    return render_template('porte6_causalite.html')

@app.route('/porte7')
def porte7():
    return render_template('porte7_orientation.html')

@app.route('/porte8')
def porte8():
    return render_template('porte8_equilibre.html')

@app.route('/porte9')
def porte9():
    return render_template('porte9_divin.html')

@app.route('/arithmetique-sacree')
def arithmetique_sacree():
    return render_template('arithmetique_sacree.html')

@app.route('/cycles-mod9')
def cycles_mod9():
    return render_template('cycles_mod9.html')

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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5002) 