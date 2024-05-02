# Application factory where the Flask app instance and  configurations are defined,
# includes integration with Flask-SocketIO for real-time websocket communication. 

from flask import Flask
from flask_socketio import SocketIO
from .routes.api import api_blueprint
from dotenv import load_dotenv  # loads environment variables from .env 

def create_app():
    load_dotenv()  # Environment variables accessible via os.getenv()

    # Initialize  SocketIO object with cross-origin resource sharing 
    socketio = SocketIO(cors_allowed_origins="*", logger=True, engineio_logger=True)

    # Creates an instance of Flask app
    application = Flask(__name__)

    # Registers a blueprint with the Flask application
    application.register_blueprint(api_blueprint, url_prefix='/api')
    
    # Integrates SocketIO with the Flask application
    socketio.init_app(application)

    # Returns the configured Flask app
    return application
