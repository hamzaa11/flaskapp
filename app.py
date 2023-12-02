from flask import Flask, render_template, request, flash, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__, static_url_path='/static', static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://usersdatabase_user:EdpD0EYTo1Yw2UbXm9jzuomLa7Lg1EXt@dpg-clklh0uaov6s73eik2b0-a:5432/usersdatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '84857457'

db = SQLAlchemy()
db.init_app(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.username}>'

@app.route('/')
def home():
    logged_in = request.args.get('logged_in', False) 
    show_error_signin = request.args.get('show_error_signin', False) 
    return render_template('home.html', logged_in=logged_in, show_error_signin=show_error_signin)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Retrieve username and password from the form
        username = request.form.get('username')
        password = request.form.get('password')

        # Replace this with your actual user query logic
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password_hash, password):
            # Successful login
            flash('Login successful', 'success')
            return redirect(url_for('profile'))
        else:
            # Failed login
            flash('Invalid username or password', 'error')

    return render_template('login.html')

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        # Retrieve data from the form
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        # Hash the password before storing it in the database
        hashed_password = generate_password_hash(password)

        # Create a new user
        new_user = User(username=username, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        # Redirect to login page
        flash('Account created successfully. Please log in.', 'success')
        return render_template('login.html')

    return render_template('signin.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

if __name__ == '__main__':
    app.run(debug=True)
