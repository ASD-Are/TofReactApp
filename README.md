# TofReactApp
# Real-time Gesture Detector

This project implements a **Real-time Gesture Detector** using a serial connection to process posture and gesture data. The system interacts with a **NeoCleO board** to fetch prediction data and visualizes it in a user-friendly interface with a gesture display and heatmap.

## Features
- **Real-time Gesture Recognition**:
  - Recognizes gestures such as `love`, `like`, `dislike`, `flathand`, `CrossHands`, `fist`, and directional gestures like `right`, `left`, `up`, `down`, `tap`, `double tap`, `go away`.
  - Displays corresponding emojis for detected gestures.
- **Heatmap Visualization**:
  - Dynamically updates an 8x8 grid heatmap with numerical data from the serial input.
- **Interactive UI**:
  - Provides buttons to connect and disconnect from a serial port.
  - Visual cues for data collection and processing.

## Setup Instructions

### Step 1: Flash the Binary File to the NeoCleO Board
1. Download the precompiled binary file containing the gesture prediction model.
2. Flash the binary to your NeoCleO board using a flashing tool like **ST-LINK Utility** or **STM32CubeProgrammer**.
   - Ensure the board is configured correctly and connected to your system.
   - Set the correct COM port and baud rate for communication.

### Step 2: Prepare the React Application
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-time-gesture-detector.git
   cd real-time-gesture-detector
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

## How It Works

1. **NeoCleO Board**:
   - The board processes input data, runs it through the pre-flashed prediction model, and outputs gesture predictions along with a numerical matrix.
   - Predictions include both gesture labels and raw matrix data, which the UI parses and displays.

2. **React UI**:
   - Connects to the NeoCleO board via the Web Serial API.
   - Filters and maps gesture predictions to display corresponding emojis.
   - Dynamically visualizes the 8x8 matrix as a color-coded heatmap.

## Usage

1. **Flash the Binary**:
   - Ensure the binary file is flashed to the NeoCleO board.

2. **Connect to Serial Port**:
   - Click the **Connect** button to initiate a serial connection.
   - The app will begin receiving prediction data.

    ![image](https://github.com/user-attachments/assets/6964e546-fa70-4139-95c0-4bbcf1aceb45)

3. **Gesture Detection**:
   - Detected gestures will be displayed as emojis with a corresponding label.

4. **Heatmap Visualization**:
   - The heatmap updates dynamically with numerical data parsed from the serial input.

5. **Disconnect Serial Port**:
   - Click the **Disconnect** button to terminate the serial connection.

## Project Structure

- **`App.js`**:
  - Contains the main logic for serial communication, gesture detection, and heatmap rendering.
- **`EMOJI_MAP`**:
  - Maps gestures to corresponding emojis for display.
- **CSS-in-JS**:
  - Inline styles ensure the UI is visually consistent and responsive.

## Key Code Components

### Serial Communication
Uses the Web Serial API to communicate with the NeoCleO board:
```javascript
const port = await navigator.serial.requestPort();
await port.open({ baudRate: 115200 });
```

### Gesture Parsing
Regular expressions identify gestures and map them to corresponding emojis:
```javascript
const POSTURE_PATTERN = /Posture\s+=\s+#\d+\s+\{(love|like|dislike|flathand|CrossHands|fist)\}/i;
const GESTURE_PATTERN = /Gesture\s+(right|left|UP|down|tap|double\s+tap|gw\s+away)/i;
```

### Heatmap Generation
Parses 64 numerical values to create an 8x8 heatmap grid:
```javascript
const matrix = Array.from({ length: 8 }, (_, i) => numbers.slice(i * 8, i * 8 + 8));
setHeatmapData(matrix);
```

## Troubleshooting
- **Serial connection issues**:
  - Ensure your browser supports the Web Serial API.
  - Verify the board is flashed correctly and communicates over the specified baud rate (`115200`).
- **Data not displaying**:
  - Ensure the NeoCleO board sends properly formatted data strings.

## Future Enhancements
- Add support for additional gesture mappings.
- Provide built-in flashing functionality for easier setup.
- Extend compatibility for other prediction hardware.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
This project integrates gesture recognition systems using LSTM and 3D CNN technologies, enhanced with visualization tools for real-time applications.
