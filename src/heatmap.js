import React, { useState, useEffect } from "react";

const POSTURE_PATTERN = /Posture\s+=\s+#\d+\s+\{(love|like|dislike|flathand|CrossHands|fist)\}/i;
const GESTURE_PATTERN = /Gesture\s+(right|left|UP|down|tap|double\s+tap|gw\s+away)/i;

const EMOJI_MAP = {
  love: "❤",
  like: "👍",
  dislike: "👎",
  flathand: "✋",
  CrossHands: "❌",
  fist: "✊",
  right: "➡",
  left: "⬅",
  UP: "⬆",
  down: "⬇",
  tap: "🖱",
  "double tap": "👆👆",
  "gw away": "🌀",
  none: "🤔",
};

export default function App() {
  const [connected, setConnected] = useState(false);
  const [gesture, setGesture] = useState("none");
  const [emoji, setEmoji] = useState(EMOJI_MAP["none"]);
  const [heatmapData, setHeatmapData] = useState(Array(8).fill(Array(8).fill(0)));

  const connectSerialPort = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      setConnected(true);
      handleSerialData(reader);
    } catch (err) {
      console.error("Error:", err.message);
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

      if (buffer.includes("\n")) {
        const lines = buffer.split("\n");
        for (let i = 0; i < lines.length - 1; i++) {
          processLine(lines[i].trim());
        }
        buffer = lines[lines.length - 1];
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
    }

    const numberPattern = /-?\d+/g;
    const numbers = Array.from(line.matchAll(numberPattern)).map((match) => parseInt(match[0], 10));

    if (numbers.length >= 64) {
      updateHeatmap(numbers.slice(0, 64));
    }
  };

  const updateHeatmap = (numbers) => {
    const matrix = Array.from({ length: 8 }, (_, i) => numbers.slice(i * 8, i * 8 + 8));
    setHeatmapData(matrix);
  };

  const disconnectSerialPort = () => {
    setConnected(false);
  };

  const speakGesture = (gesture) => {
    const utterance = new SpeechSynthesisUtterance(gesture);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (gesture !== "none") {
      speakGesture(gesture);
    }
  }, [gesture]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", padding: "20px", backgroundColor: "#f9f9f9" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "10px", fontSize: "28px" }}>
        Real-time Gesture Detector
      </h1>
      <p style={{ textAlign: "center", fontSize: "20px", marginBottom: "20px" }}>
        {Object.values(EMOJI_MAP).join(" ")}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={connectSerialPort}
              style={{
                padding: "12px 25px",
                backgroundColor: connected ? "#9E9E9E" : "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: connected ? "not-allowed" : "pointer",
              }}
              disabled={connected}
            >
              Connect
            </button>
            <button
              onClick={disconnectSerialPort}
              style={{
                padding: "12px 25px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: connected ? "pointer" : "not-allowed",
              }}
              disabled={!connected}
            >
              Disconnect
            </button>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#4CAF50",
              border: "2px solid #4CAF50",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "#f1f1f1",
            }}
          >
            {gesture === "none" ? "Waiting..." : `${emoji} ${gesture.toUpperCase()}`}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#4CAF50", fontSize: "22px", marginBottom: "10px" }}>Heatmap</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "2px" }}>
            {heatmapData.flat().map((value, index) => (
              <div
                key={index}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: `hsl(${Math.min(value, 255)}, 80%, 70%)`,
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                }}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
