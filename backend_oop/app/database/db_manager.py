import mysql.connector
import os
from flask import current_app

class DatabaseManager:
    def __init__(self):
        # Initalises the DatabaseManager with config from environment variables
        self.db_config = {
            "host": os.getenv("DB_HOST"),         
            "user": os.getenv("DB_USER"),          
            "password": os.getenv("DB_PASSWORD"),  
            "database": os.getenv("DB_NAME"),     
            "port": int(os.getenv("DB_PORT"))      
        }
 
    def insert_data_into_mysql(self, message):
        # Inserts  single message into the 'mqtt_messages' table in  MySQL database
        try:
            # Establishes a new database connection
            connection = mysql.connector.connect(**self.db_config)
            cursor = connection.cursor()
            
            # SQL query to insert data
            insert_query = "INSERT INTO mqtt_messages (notes_data) VALUES (%s)"
            cursor.execute(insert_query, (message,))
            connection.commit()  
            print("Data inserted into MySQL successfully")
        except mysql.connector.Error as error:
            print(f"Error inserting data: {error}")
        finally:
            # Ensures database connection is closed even if an error occurs
            if connection.is_connected():
                cursor.close()
                connection.close()

    def get_data_from_mysql(self, limit=16):
        # Retrieves data from databse with limitited number of entries
        try:
            connection = mysql.connector.connect(**self.db_config)
            cursor = connection.cursor()
            select_query = """
            SELECT id, timestamp, notes_data
            FROM mqtt_messages
            ORDER BY timestamp DESC
            LIMIT %s
            """
            cursor.execute(select_query, (limit,))
            data = cursor.fetchall()

            # formats fetched data for visualisation in data table
            data_list = [{'id': row[0], 'timestamp': row[1], 'message': row[2]} for row in reversed(data)]
            return data_list
        except mysql.connector.Error as error:
            print(f"Database error: {error}")
            return []
        finally:
            cursor.close()
            connection.close()

    def fetch_note_data_from_mysql(self, limit=16):
        # Fetches note data from the database
        try:
            connection = mysql.connector.connect(**self.db_config)
            cursor = connection.cursor()
            select_query = "SELECT notes_data FROM mqtt_messages ORDER BY id DESC LIMIT %s"
            cursor.execute(select_query, (limit,))
            data = cursor.fetchall()

            # Reverses the list so that newer entries appear first in score visualiser
            note_data = [row[0] for row in reversed(data)]
            grouped_notes = [note_data[i:i+4] for i in range(0, len(note_data), 4)]
            return grouped_notes
        except mysql.connector.Error as error:
            print(f"Error fetching note data: {error}")
            return []
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def emit_data_update_signal(self):
        # Emits a signal to update client for real time score visualistion
        print("Emitting data update signal")
        socketio = current_app.extensions['socketio']
        socketio.emit('data_update', {'message': 'New data available'})
