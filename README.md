https://github.com/karloslokokos/Symphonic_Steps

Multi-Component IoT and Audio System

This repository contains the complete source code for an IoT-based project that includes microcontroller programming for ESP32, a Raspberry Pi serving as an MQTT subscriber, a Flask backend, and a React frontend application.

Project Components

1. ESP32 Microcontroller - Handles ultrasonic sensor data and publishes it to an MQTT broker.
2. Raspberry Pi - Subscribes to MQTT topics to trigger audio playback based on sensor data.
3. Flask API - Manages MQTT message storage, handles API requests, and provides real-time data communication.
4. React Frontend - Displays real-time data, manages WebSocket connections, and offers a user interface for interaction.

## Installation

### Prerequisites

- Python 3.8+
- Node.js 12.x+
- Yarn or npm
- Arduino IDE for ESP32 programming
- Raspberry Pi set up with Raspbian

### Setting up ESP32

1. Arduino Code: Load the ESP32 code from the `ESP32` folder into Arduino IDE.
2. Dependencies: Install the necessary libraries from the Arduino Library Manager.
3. Upload: Connect your ESP32 via USB and upload the sketch.

### Configuring Raspberry Pi

1. **Install Dependencies**:
   ```bash
   sudo apt-get update
   sudo apt-get install python3-pip
   sudo pip3 install paho-mqtt pygame
   ```
2. **Run the Subscriber Script**: Navigate to the `RaspberryPi` directory and run:
   ```bash
   python3 symphonic_steps_pi.py
   ```

### Flask API Setup

1. **Environment Setup**: Navigate to the `FlaskAPI` directory and install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. **Run the Flask Server**:
   ```bash
   python application.py
   ```

### React Frontend

1. **Installation**: In the `ReactApp` directory, run:
   ```bash
   yarn install  # or npm install
   ```
2. **Start the Application**:
   ```bash
   yarn start  # or npm start
   ```

## Usage

- ESP32 will automatically start sending sensor data upon power up.
- Raspberry Pi listens for MQTT messages and plays corresponding audio files.
- Flask API must be running to handle data storage and API requests.
- React Application provides a GUI for real-time data visualization and control.

## Contributing

Contributions to this project are welcome! Please fork the repository and submit a pull request with your features and bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

