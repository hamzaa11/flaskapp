from flask import Flask, render_template, request, flash, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_url_path='/static', static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://usersdatabase_user:EdpD0EYTo1Yw2UbXm9jzuomLa7Lg1EXt@dpg-clklh0uaov6s73eik2b0-a:5432/usersdatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '84857457'

db = SQLAlchemy()
db.init_app(app)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(5000), unique=True, nullable=False)
    email = db.Column(db.String(12000), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


@app.route('/')
def home():
    logged_in = request.args.get('logged_in', False) 
    show_error_signin = request.args.get('show_error_signin', False) 
    return render_template('home.html',logged_in=logged_in, show_error_signin=show_error_signin)


@app.route('/login', methods=['GET', 'POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    print(password)

    checked_mail = User.query.filter_by(email=email).first()

    print(checked_mail)
    if checked_mail:
        checked_pass = check_password_hash(checked_mail.password, password)
        if checked_pass:
            logged_in = True
            return redirect(url_for('home', logged_in=logged_in))
        else: 
            flash('Password or Email invaild', category='Password')
            show_error = True
            show_login = True
            return redirect(url_for('home', show_login=show_login, show_error=show_error)) 
    else:
        flash('Password or Email invaild', category='Email')
        show_login = True
        show_error = True
        return redirect(url_for('home', show_login=show_login, show_error=show_error)) 
       
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        if email and username and password:
            check_email = User.query.filter_by(email=email).first()
            check_username = User.query.filter_by(username=username).first()
            short_password = len(password) < 8
            no_pass_charcter =  " " in password

            if check_email or check_username or short_password or no_pass_charcter:
                show_error_signin = True
                show_vaild_signin = False
                if short_password or no_pass_charcter:
                    if short_password:
                        flash('Password is too short', category='passwordSigninerror')
                    if no_pass_charcter:
                        flash('No spaces', category='passwordSigninerror')
                else:
                    flash('✔', category='passwordSigninvaild')
                    show_vaild_signin = True
                
                if check_email:
                    flash('Already exists', category='emailSigninerror')
                else:
                    flash('✔', category='emailSigninvaild')
                    show_vaild_signin = True
                
                if check_username:
                    flash('Already exists', category='usernameSigninerror')
                    
                else:
                    flash('✔', category='usernameSigninvaild')
                    show_vaild_signin = True

                return redirect(url_for('home', show_error_signin=show_error_signin,show_vaild_signin=show_vaild_signin))

            else:
                hashpass = generate_password_hash(password)
                new_user = User(username=username, email=email, password=hashpass)
                logged_in = True
                with app.app_context():
                    db.session.add(new_user)
                    db.session.commit()
                return redirect(url_for('home',logged_in=logged_in))
        else:
            flash('Please fill all fields', category='genralerror')
            show_error_signin = True
            return redirect(url_for('home', show_error_signin=show_error_signin))



@app.route('/profile')
def profile():
    return render_template('profile.html')



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
