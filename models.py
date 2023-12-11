from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(10485760), unique=True, nullable=False)
    email = db.Column(db.String(10485760), unique=True, nullable=False)
    password = db.Column(db.String(10485760), nullable=False)

    # You can add any additional methods or configurations here
