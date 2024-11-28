import React, { useState, useEffect } from "react";

// Define regex patterns
const POSTURE_PATTERN = /Posture\s+=\s+#\d+\s+\{(love|like|dislike|flathand|CrossHands|fist)\}/i;
const GESTURE_PATTERN = /Gesture\s+(right|left|UP|down|tap|double\s+tap|gw\s+away)/i;

// Emoji mappings
const EMOJI_MAP = {
  love: "❤️",
  like: "👍",
  dislike: "👎",
  flathand: "✋",
  CrossHands: "❌",
  fist: "✊",
  right: "➡️",
  left: "⬅️",
  UP: "⬆️",
  down: "⬇️",
  tap: "🖱️",
  "double tap": "👆👆",
  "gw away": "🌀",
  none: "🤔",
};

export default function App() {
  const [connected, setConnected] = useState(false);
  const [gesture, setGesture] = useState("none");
  const [emoji, setEmoji] = useState(EMOJI_MAP["none"]);
  const [log, setLog] = useState([]);
  const [lastSpokenGesture, setLastSpokenGesture] = useState(null);

  const connectSerialPort = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      setConnected(true);

      // Handle serial data with a buffered reader
      handleSerialData(reader);
    } catch (err) {
      setLog((prev) => [`Error: ${err.message}`, ...prev]);
      setConnected(false);
    }
  };

  const handleSerialData = async (reader) => {
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        reader.releaseLock();
        break;
      }

      buffer += value;

      // Process only when a complete line is received
      if (buffer.includes("\n")) {
        const lines = buffer.split("\n");
        for (let i = 0; i < lines.length - 1; i++) {
          processLine(lines[i].trim());
        }
        buffer = lines[lines.length - 1]; // Retain incomplete line
      }
    }
  };

  const processLine = (line) => {
    let detectedGesture = "none";

    const postureMatch = POSTURE_PATTERN.exec(line);
    if (postureMatch) {
      detectedGesture = postureMatch[1].toLowerCase();
    }

    const gestureMatch = GESTURE_PATTERN.exec(line);
    if (gestureMatch) {
      detectedGesture = gestureMatch[1].toLowerCase();
    }

    if (detectedGesture !== "none") {
      setGesture(detectedGesture);
      setEmoji(EMOJI_MAP[detectedGesture] || "🤔");
      setLog((prev) => [`${new Date().toLocaleTimeString()} - ${detectedGesture}`, ...prev]);

      // Speak the gesture only if it hasn't been spoken recently
      if (lastSpokenGesture !== detectedGesture) {
        setLastSpokenGesture(detectedGesture);
        speakGesture(detectedGesture);
      }
    } else {
      setLog((prev) => [`${new Date().toLocaleTimeString()} - No Match: ${line}`, ...prev]);
    }
  };

  const speakGesture = (gesture) => {
    const utterance = new SpeechSynthesisUtterance(gesture);
    window.speechSynthesis.speak(utterance);
  };

  const disconnectSerialPort = () => {
    setConnected(false);
    setLog((prev) => [`${new Date().toLocaleTimeString()} - Disconnected`, ...prev]);
  };

  // Debounce log updates to avoid flooding the UI
  useEffect(() => {
    const interval = setInterval(() => {
      setLog((prev) => prev.slice(0, 20)); // Keep the last 20 logs
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#0078D7" }}>Real-Time Gesture Detector</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <button
          onClick={connectSerialPort}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: connected ? "#28A745" : "#0078D7",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: connected ? "not-allowed" : "pointer",
          }}
          disabled={connected}
        >
          {connected ? "Connected" : "Connect"}
        </button>
        <button
          onClick={disconnectSerialPort}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#DC3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: connected ? "pointer" : "not-allowed",
          }}
          disabled={!connected}
        >
          Disconnect
        </button>
      </div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Detected Gesture:</h2>
        <div
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#0078D7",
            padding: "10px",
            border: "2px solid #0078D7",
            borderRadius: "10px",
            display: "inline-block",
          }}
        >
          {gesture === "none" ? "Waiting..." : `${emoji} ${gesture.toUpperCase()}`}
        </div>
      </div>
      <div>
        <h2>Available Gestures:</h2>
        <div
          style={{
            fontSize: "24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {Object.entries(EMOJI_MAP).map(([key, emoji]) =>
            key !== "none" ? (
              <span key={key} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
                {emoji}
              </span>
            ) : null
          )}
        </div>
      </div>
      <div>
        <h2>Logs:</h2>
        <textarea
          value={log.join("\n")}
          readOnly
          style={{
            width: "100%",
            height: "200px",
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        ></textarea>
      </div>
    </div>
  );
}
