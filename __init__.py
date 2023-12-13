from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import User, db
import os

app = Flask(__name__, static_url_path='/static', static_folder='static')
app.config['SECRET_KEY'] = '84857457'
app.config['SQLALCHEMY_DATABASE_URI'] = os.enviorn.get('DATAASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

from routes import *

migrate = Migrate(app, db)



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
