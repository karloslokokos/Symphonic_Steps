from dotenv import load_dotenv  
from flask_cors import CORS 

load_dotenv()  

from app import create_app  # Imports the create_app function from the app module 

application = create_app()  # Creates an instance of the Flask application using  create_app function

CORS(application, resources={r"/cli": {"origins": "*"}})  # Enable CORS for all origins allowing cross-origin requests from client

if __name__ == '__main__':  
    application.run(host='0.0.0.0', port=5000)  # Starts  Flask application on port 5000
