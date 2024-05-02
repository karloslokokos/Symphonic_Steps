import paho.mqtt.publish as publish  
import os  

class MQTTManager:
    def __init__(self):
        # Constructor for initialising  MQTTManager 
        self.mqtt_broker_ip = os.getenv("MQTT_BROKER_IP")  
        self.mqtt_topic = os.getenv("MQTT_TOPIC")  

    def publish_message(self, message):
        # Publishes a message to the  MQTT broker
        try:
            
            publish.single(
                self.mqtt_topic,  # MQTT topic 
                payload=message,  # Message payload 
                hostname=self.mqtt_broker_ip  # Hostname of MQTT broker
            )
            print("Message published to MQTT topic")  
        except Exception as e:

            print(f"Error publishing MQTT message: {e}")  
