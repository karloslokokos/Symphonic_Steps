#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "VM7604111";  // Address of my router
const char* password = "c5hFmNnrmfhn"; //Router Password
const char* mqtt_server = "192.168.0.43";  // MQTT broker's IP
const char* deviceID = "ESP32_1"; //Each Esp code has its own unique id

const char* distanceTopic = "ultrasonic_distance_1";  // MQTT topic for distance data
const char* motionTopic = "Esp32_1_triggered";        // MQTT topic for motion detection
//const char* topic = "sensor_data";                  // MQTT topic for other sensor data
const int trigPin = 10;
const int echoPin = 11;
const int MAX_DISTANCE = 55;

// Define sound speed in cm/uS
#define SOUND_SPEED 0.034

// Variables to hold sensor data
long duration;
float distanceCm;
float distanceInch;
bool beamBroken = false;  // Variable to track the beam state


// WiFi and MQTT client objects
WiFiClient espClient;
PubSubClient client(espClient);

unsigned long previousMillis = 0; // Stores last time sensor data was published
const long interval = 10;  // Set the interval for sensor readings (10 microseconds)

// Setup function initializes serial communication and device configurations
void setup() {
  Serial.begin(115200);      // Starts the serial communication
  pinMode(trigPin, OUTPUT);  // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);   // Sets the echoPin as an Input
  setup_wifi();
  client.setServer(mqtt_server, 1883);
}

// Function to connect the device to WiFi
void setup_wifi() {
  delay(100);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
}

// Function to ensure the device remains connected to the MQTT broker
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

String clientID = "ESP32Client_" + String(deviceID);

    if (client.connect(clientID.c_str())) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
// Main loop where sensor readings and MQTT publishing are implemented
void loop() {
  if (!client.connected()) {
    reconnect();
  }

  unsigned long currentMillis = millis();

  // Check if it's time to read the sensor and publish data
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    // Clears the trigPin
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    // Sets the trigPin on HIGH state for 10 microseconds
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    // Reads the echoPin, returns the sound wave travel time in microseconds
    duration = pulseIn(echoPin, HIGH);

    // Calculate the distance
    distanceCm = duration * SOUND_SPEED / 2;

    // Prints the distance in the Serial Monitor
    Serial.print("Distance (cm): ");
    Serial.println(distanceCm);

    // Publish distance data to MQTT
    if (client.publish(distanceTopic, String(distanceCm).c_str())) {
      Serial.println("Distance data published.");
    } else {
      Serial.println("Failed to publish distance data.");
    }

    // Check if the beam is broken
    if (distanceCm < MAX_DISTANCE) {
      if (!beamBroken) {
        // Publish a "Motion detected" message to MQTT when the beam is first broken
        if (client.publish(motionTopic, "C4")) {
          Serial.println("note_1_detected, Message sent.");
          beamBroken = true;
        } else {
          Serial.println("Motion detection message failed to send.");
        }
      }
    } else {
      beamBroken = false;  // Reset the beam state when it's not broken
    }
  }

  delay(500);
}

