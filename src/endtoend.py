import serial
import csv
import time

# Open the serial port (make sure to replace 'COM3' with your actual port)
ser = serial.Serial('COM3', 115200, timeout=1)

# Initialize lists to store values
pH_values = []
moisture_values = []
EC_values = []

# Function to parse the value from the received line
def parse_value(line):
    try:
        # Split on the first colon and return the trimmed value
        return float(line.split(':')[1].strip())
    except (ValueError, IndexError) as e:
        print(f"Error parsing line: {line} - {e}")
        return None  # Return None if there's an error

while True:
    # Read the line from the serial port
    line = ser.readline().decode('utf-8').strip()
    print(f"Received: {line}")  # Print the received line for debugging

    # Parse the line and extract the values
    if 'pH Value:' in line:
        pH_value = parse_value(line)
        if pH_value is not None:
            pH_values.append(pH_value)
    elif 'Moisture:' in line:
        moisture_value = parse_value(line)
        if moisture_value is not None:
            moisture_values.append(moisture_value)
    elif 'EC:' in line:
        EC_value = parse_value(line)
        if EC_value is not None:
            EC_values.append(EC_value)

    # If we have 3 readings of each, calculate the average and write to CSV
    if len(pH_values) == 3 and len(moisture_values) == 3 and len(EC_values) == 3:
        avg_pH = sum(pH_values) / len(pH_values)
        avg_moisture = sum(moisture_values) / len(moisture_values)
        avg_EC = sum(EC_values) / len(EC_values)

        # Write averages to CSV
        with open('sensor_data.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([avg_pH, avg_moisture, avg_EC])
            print(f"Averages written to CSV: pH={avg_pH}, Moisture={avg_moisture}, EC={avg_EC}")

        # Clear the lists for the next readings
        pH_values.clear()
        moisture_values.clear()
        EC_values.clear()

    time.sleep(1)  # Optional: add a delay to avoid overwhelming the serial port
