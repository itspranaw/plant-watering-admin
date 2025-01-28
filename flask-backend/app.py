from flask import Flask, jsonify
from flask_cors import CORS
from data.mock_devices import get_mock_devices

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/devices', methods=['GET'])
def get_devices():
    devices = get_mock_devices()
    return jsonify(devices)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)