import unittest
from app import create_app

class TestAPIBlueprint(unittest.TestCase):
    def setUp(self):
        # Create a test client using the Flask application configured for testing
        self.app = create_app()
        self.client = self.app.test_client()

    def test_receive_mqtt_message_endpoint(self):
        # Test if the POST request to the /mqtt endpoint succeeds
        response = self.client.post('/api/mqtt', data={'message': 'test_message'})
        self.assertEqual(response.status_code, 200)

    def test_fetch_note_data_from_mysql_endpoint(self):
        # Test if the GET request to the /get_note_data endpoint succeeds
        response = self.client.get('/api/get_note_data?limit=10')
        self.assertEqual(response.status_code, 200)

    def test_get_data_from_mysql_endpoint(self):
        # Test if the GET request to the /get_data endpoint succeeds
        response = self.client.get('/api/get_data')
        self.assertEqual(response.status_code, 200)

    def test_switch_dictionary_endpoint(self):
        # Test if the POST request to the /switch_dictionary endpoint succeeds
        response = self.client.post('/api/switch_dictionary', json={'dictionary': 'new_dict'})
        self.assertEqual(response.status_code, 200)

        # Test for missing dictionary
        response = self.client.post('/api/switch_dictionary', json={})
        self.assertEqual(response.status_code, 400)

if __name__ == '__main__':
    unittest.main()
