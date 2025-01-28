import time
import random

def generate_mock_device(user_id):
    current_time = int(time.time())
    battery_voltage = round(3.0 + random.random(), 2)  # Random between 3.0-4.0V
    watering_status = random.choice(['w0', 'w1'])
    
    if watering_status == 'w1':
        data_string = (
            f"{current_time}:w1:"
            f"{random.randint(1000, 5000)}:"  # milliseconds elapsed
            f"{random.randint(50, 150)}~"     # flow reading
            f"{current_time}:Battery voltage:{battery_voltage}~"
        )
    else:
        data_string = (
            f"{current_time}:w0:"
            f"{random.randint(3000, 8000)}:"  # time elapsed
            f"{random.randint(50, 150)}:"     # flow reading before closing
            f"{random.randint(500, 1500)}:"   # milliseconds after closing
            f"{random.randint(0, 10)}~"       # final flow reading
            f"{current_time}:Battery voltage:{battery_voltage}~"
        )
    
    return {
        "user_id": user_id,
        "name": f"Device {user_id}",
        "data": data_string
    }

def get_mock_devices():
    return [generate_mock_device(i) for i in range(1, 6)]  # Generate 5 devices