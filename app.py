from flask import Flask, render_template, request, flash, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_url_path='/static', static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://usersdatabase_user:EdpD0EYTo1Yw2UbXm9jzuomLa7Lg1EXt@dpg-clklh0uaov6s73eik2b0-a:5432/usersdatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '84857457'

db = SQLAlchemy()
db.init_app(app)


@app.route('/')
def home():
    logged_in = request.args.get('logged_in', False) 
    show_error_signin = request.args.get('show_error_signin', False) 
    return render_template('home.html',logged_in=logged_in, show_error_signin=show_error_signin)


@app.route('/login', methods=['GET', 'POST'])
def login():
    return 'login'

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    return 'signin'



@app.route('/profile')
def profile():
    return render_template('profile.html')



if __name__ == '__main__':
    app.run(debug=True)
