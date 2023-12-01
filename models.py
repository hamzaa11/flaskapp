# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(5000), unique=True, nullable=False)
    email = db.Column(db.String(12000), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    bookmarked_movies = db.relationship('Movie', secondary='user_movie', backref='users', lazy='dynamic')

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)

user_movie = db.Table('user_movie',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('movie_id', db.Integer, db.ForeignKey('movie.id'), primary_key=True)
)
