
import paho.mqtt.client as mqtt
import pygame
import requests
import threading

# Initialize Pygame's mixer module
pygame.mixer.init()

# Dictionaries to map topics to audio files
piano_dictionary = {
    "Esp32_1_triggered": "/home/karloslokokos/Desktop/Samples/piano/C.ogg",
    "Esp32_2_triggered": "/home/karloslokokos/Desktop/Samples/piano/D.ogg",
    "Esp32_3_triggered": "/home/karloslokokos/Desktop/Samples/piano/E.ogg",
    "Esp32_4_triggered": "/home/karloslokokos/Desktop/Samples/piano/F.ogg",
    "Esp32_5_triggered": "/home/karloslokokos/Desktop/Samples/piano/G.ogg",
    "Esp32_6_triggered": "/home/karloslokokos/Desktop/Samples/piano/A.ogg",
    "Esp32_7_triggered": "/home/karloslokokos/Desktop/Samples/piano/B.ogg",+
    "Esp32_8_triggered": "/home/karloslokokos/Desktop/Samples/piano/C2.ogg",
}

drums_dictionary= {
    "Esp32_1_triggered": "/home/karloslokokos/Desktop/Samples/drums/C.ogg",
    "Esp32_2_triggered": "/home/karloslokokos/Desktop/Samples/drums/D.ogg",
    "Esp32_3_triggered": "/home/karloslokokos/Desktop/Samples/drums/E.ogg",
    "Esp32_4_triggered": "/home/karloslokokos/Desktop/Samples/drums/F.ogg",
    "Esp32_5_triggered": "/home/karloslokokos/Desktop/Samples/drums/G.ogg",
    "Esp32_6_triggered": "/home/karloslokokos/Desktop/Samples/drums/A.ogg",
    "Esp32_7_triggered": "/home/karloslokokos/Desktop/Samples/drums/B.ogg",
    "Esp32_8_triggered": "/home/karloslokokos/Desktop/Samples/drums/C2.ogg",
   
}

violin_dictionary= {
    "Esp32_1_triggered": "/home/karloslokokos/Desktop/Samples/violin/C.ogg",
    "Esp32_2_triggered": "/home/karloslokokos/Desktop/Samples/violin/D.ogg",
    "Esp32_3_triggered": "/home/karloslokokos/Desktop/Samples/violin/E.ogg",
    "Esp32_4_triggered": "/home/karloslokokos/Desktop/Samples/violin/F.ogg",
    "Esp32_5_triggered": "/home/karloslokokos/Desktop/Samples/violin/G.ogg",
    "Esp32_6_triggered": "/home/karloslokokos/Desktop/Samples/violin/A.ogg",
    "Esp32_7_triggered": "/home/karloslokokos/Desktop/Samples/violin/B.ogg",
    "Esp32_8_triggered": "/home/karloslokokos/Desktop/Samples/violin/C2.ogg",
   
}

guitar_dictionary = {
    "Esp32_1_triggered": "/home/karloslokokos/Desktop/Samples/guitar/C.ogg",
    "Esp32_2_triggered": "/home/karloslokokos/Desktop/Samples/guitar/D.ogg",
    "Esp32_3_triggered": "/home/karloslokokos/Desktop/Samples/guitar/E.ogg",
    "Esp32_4_triggered": "/home/karloslokokos/Desktop/Samples/guitar/F.ogg",
    "Esp32_5_triggered": "/home/karloslokokos/Desktop/Samples/guitar/G.ogg",
    "Esp32_6_triggered": "/home/karloslokokos/Desktop/Samples/guitar/A.ogg",
    "Esp32_7_triggered": "/home/karloslokokos/Desktop/Samples/guitar/B.ogg",
    "Esp32_8_triggered": "/home/karloslokokos/Desktop/Samples/guitar/C2.ogg",
}

# Dictionary to store currently playing sounds
playing_sounds = {}

# Lock for synchronising access to shared resources, used when interacting with Flask app
flask_lock = threading.Lock()

# Variable to store the currently active topic_to_audio dictionary
active_dictionary = piano_dictionary

# Number of mixer channels set to 8 to allow mutiple audio files to be played simultaneously
NUM_CHANNELS = 8
pygame.mixer.set_num_channels(NUM_CHANNELS)

# Function for playing audio files
def play_sound(audio_file):
    sound = pygame.mixer.Sound(audio_file)
    sound.play()

# Callback for MQTT client connection
def on_connect(client, rc):
    print(f"Connected to MQTT broker with result code {rc}")
    for topic in active_dictionary:
        client.subscribe(topic)
    # Subscribe to the switch_dictionary topic
    client.subscribe("switch_dictionary")

# Callback for MQTT client messages
def on_message(msg):
    global active_dictionary

    topic = msg.topic
    payload = msg.payload.decode()

    # print(f"Start processing message on topic {topic}: {payload}")

    if topic == "switch_dictionary":
        # Switch dictionary based on the received message
        if payload == "piano_dictionary":
            active_dictionary = piano_dictionary
        elif payload == "drums_dictionary":
            active_dictionary = drums_dictionary
        elif payload == "violin_dictionary":
            active_dictionary = violin_dictionary
        elif payload == "guitar_dictionary":
            active_dictionary = guitar_dictionary
    elif topic in active_dictionary:
        # Get audio file
        audio_file = active_dictionary[topic]

        # Start a thread to play the sound
        sound_thread = threading.Thread(target=play_sound, args=(audio_file,))
        sound_thread.start()


        # After processing the message, send message to Flask app
        send_message_to_flask_app(topic, payload)
        
    # print(f"End processing message on topic {topic}")


# Function to send MQTT messages to Flask app
def send_message_to_flask_app(topic, message):
    with flask_lock:
        flask_app_url = "http://192.168.0.20:5000/api/mqtt"  # IP of Mac and flask API route
        data = {'topic': topic, 'message': message}
        response = requests.post(flask_app_url, data=data)
        if response.status_code == 200:
            print("Message sent to Flask app successfully")
        else:
            print("Failed to send message to Flask app")

# Create MQTT client instance
mqtt_client = mqtt.Client()

mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

# Connect to the MQTT broker
mqtt_client.connect("192.168.0.43", 1883, 60)

# Start the MQTT client loop in a separate thread
mqtt_thread = threading.Thread(target=mqtt_client.loop_forever)
mqtt_thread.start()

