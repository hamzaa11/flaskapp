from flask import render_template, request, flash, redirect, url_for
from werkzeug.security import check_password_hash, generate_password_hash
from __init__ import app, db
from models import User

@app.route('/')
def home():
    logged_in = request.args.get('logged_in', False) 
    show_error_signin = request.args.get('show_error_signin', False) 
    show_login_error= request.args.get('show_login_error', False)
    return render_template('home.html',logged_in=logged_in, show_error_signin=show_error_signin, show_login_error=show_login_error)

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
            flash('Password or Email invaild', category='passwordloginerror')
            show_login_error = True
            return redirect(url_for('home',show_login_error=show_login_error)) 
    else:
        flash('Password or Email invaild', category='emailloginerror')
        show_login_error = True
        return redirect(url_for('home', show_login_error=show_login_error)) 

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
    return render_template('profile.html')  # Replace 'profile.html' with your actual profile template
