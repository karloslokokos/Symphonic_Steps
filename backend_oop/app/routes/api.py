from flask import Blueprint, request, jsonify
from ..database.db_manager import DatabaseManager
from ..mqtt.mqtt_manager import MQTTManager
import paho.mqtt.publish as publish
from flask_cors import cross_origin
import os


api_blueprint = Blueprint('api', __name__)
db_manager = DatabaseManager()
mqtt_mananger = MQTTManager()

# configuration details

mqtt_broker_ip = os.getenv("MQTT_BROKER_IP")
mqtt_topic = os.getenv("MQTT_TOPIC")
client = os.getenv("CLIENT_IP")

# Receives MQTT messages and saves them into a MySQL database, then responds to the client.
@api_blueprint.route('/mqtt', methods=['POST'])
def receive_mqtt_message():
    message = request.form.get('message')
    db_manager.insert_data_into_mysql(message)
    db_manager.emit_data_update_signal()
    return jsonify({'status': 'success', 'message': 'Message received'})

# fetches note data from the MySQL database with optional limits and return the results in JSON format
@api_blueprint.route('/get_note_data', methods=['GET'])
def fetch_note_data_from_mysql():
    limit = request.args.get('limit', default=16, type=int)    
    print("Fetching note data from MySQL with limit:", limit)
    grouped_notes = db_manager.fetch_note_data_from_mysql(limit=limit)
    return jsonify(grouped_notes)

# fetches all data from the MySQL database with optional limits and returns the results in JSON format

@api_blueprint.route('/get_data', methods=['GET'])
def get_data_from_mysql():
    # Default to 16 if 'limit' parameter is not provided
    limit = request.args.get('limit', default=16, type=int)
    data_list = db_manager.get_data_from_mysql(limit=limit)
    return jsonify(data_list)

# Receives a new dictionary setting to publish over MQTT, 

@api_blueprint.route('/switch_dictionary', methods=['POST'])
@cross_origin(origins=client, allow_headers=['Content-Type', 'Authorization'], supports_credentials=True)

def switch_dictionary():
    data = request.json
    new_dictionary = data.get('dictionary')
    if new_dictionary:
        publish.single(mqtt_topic, payload=new_dictionary, hostname=mqtt_broker_ip)
        return jsonify({'status': 'success', 'message': f'Switched to {new_dictionary}'})
    else:
        return jsonify({'status': 'error', 'message': 'Missing or invalid "dictionary" value'}), 400
