// // // // import React, { useState, useEffect } from "react";

// // // // // Define regex patterns
// // // // const POSTURE_PATTERN = /Posture\s+=\s+#\d+\s+\{(love|like|dislike|flathand|crosshand|fist)\}/i;
// // // // const GESTURE_PATTERN = /Gesture\s+(right|left|up|down|tap|double\s+tap|go\s+away)/i;

// // // // export default function App() {
// // // //   const [connected, setConnected] = useState(false);
// // // //   const [gesture, setGesture] = useState("none");
// // // //   const [log, setLog] = useState([]);

// // // //   const connectSerialPort = async () => {
// // // //     try {
// // // //       const port = await navigator.serial.requestPort();
// // // //       await port.open({ baudRate: 115200 });

// // // //       const textDecoder = new TextDecoderStream();
// // // //       const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
// // // //       const reader = textDecoder.readable.getReader();

// // // //       setConnected(true);

// // // //       // Handle serial data with a buffered reader
// // // //       handleSerialData(reader);
// // // //     } catch (err) {
// // // //       setLog((prev) => [`Error: ${err.message}`, ...prev]);
// // // //       setConnected(false);
// // // //     }
// // // //   };

// // // //   const handleSerialData = async (reader) => {
// // // //     let buffer = "";

// // // //     while (true) {
// // // //       const { value, done } = await reader.read();
// // // //       if (done) {
// // // //         reader.releaseLock();
// // // //         break;
// // // //       }

// // // //       buffer += value;

// // // //       // Process only when a complete line is received
// // // //       if (buffer.includes("\n")) {
// // // //         const lines = buffer.split("\n");
// // // //         for (let i = 0; i < lines.length - 1; i++) {
// // // //           processLine(lines[i].trim());
// // // //         }
// // // //         buffer = lines[lines.length - 1]; // Retain incomplete line
// // // //       }
// // // //     }
// // // //   };

// // // //   const processLine = (line) => {
// // // //     // Match gestures and postures
// // // //     let detectedGesture = "none";

// // // //     const postureMatch = POSTURE_PATTERN.exec(line);
// // // //     if (postureMatch) {
// // // //       detectedGesture = postureMatch[1].toLowerCase();
// // // //     }

// // // //     const gestureMatch = GESTURE_PATTERN.exec(line);
// // // //     if (gestureMatch) {
// // // //       detectedGesture = gestureMatch[1].toLowerCase();
// // // //     }

// // // //     // Update state if a gesture or posture is detected
// // // //     if (detectedGesture !== "none") {
// // // //       setGesture(detectedGesture);
// // // //       setLog((prev) => [`${new Date().toLocaleTimeString()} - ${detectedGesture}`, ...prev]);
// // // //     } else {
// // // //       setLog((prev) => [`${new Date().toLocaleTimeString()} - No Match: ${line}`, ...prev]);
// // // //     }
// // // //   };

// // // //   const disconnectSerialPort = () => {
// // // //     setConnected(false);
// // // //     setLog((prev) => [`${new Date().toLocaleTimeString()} - Disconnected`, ...prev]);
// // // //   };

// // // //   // Debounce log updates to avoid flooding the UI
// // // //   useEffect(() => {
// // // //     const interval = setInterval(() => {
// // // //       setLog((prev) => prev.slice(0, 20)); // Keep the last 20 logs
// // // //     }, 200);
// // // //     return () => clearInterval(interval);
// // // //   }, []);

// // // //   return (
// // // //     <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
// // // //       <h1 style={{ textAlign: "center", color: "#0078D7" }}>Real-Time Gesture Detector</h1>
// // // //       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
// // // //         <button
// // // //           onClick={connectSerialPort}
// // // //           style={{
// // // //             padding: "10px 20px",
// // // //             fontSize: "16px",
// // // //             backgroundColor: connected ? "#28A745" : "#0078D7",
// // // //             color: "white",
// // // //             border: "none",
// // // //             borderRadius: "5px",
// // // //             cursor: connected ? "not-allowed" : "pointer",
// // // //           }}
// // // //           disabled={connected}
// // // //         >
// // // //           {connected ? "Connected" : "Connect"}
// // // //         </button>
// // // //         <button
// // // //           onClick={disconnectSerialPort}
// // // //           style={{
// // // //             padding: "10px 20px",
// // // //             fontSize: "16px",
// // // //             backgroundColor: "#DC3545",
// // // //             color: "white",
// // // //             border: "none",
// // // //             borderRadius: "5px",
// // // //             cursor: connected ? "pointer" : "not-allowed",
// // // //           }}
// // // //           disabled={!connected}
// // // //         >
// // // //           Disconnect
// // // //         </button>
// // // //       </div>
// // // //       <div style={{ textAlign: "center", marginBottom: "20px" }}>
// // // //         <h2>Detected Gesture:</h2>
// // // //         <div
// // // //           style={{
// // // //             fontSize: "24px",
// // // //             fontWeight: "bold",
// // // //             color: "#0078D7",
// // // //             padding: "10px",
// // // //             border: "2px solid #0078D7",
// // // //             borderRadius: "10px",
// // // //             display: "inline-block",
// // // //           }}
// // // //         >
// // // //           {gesture === "none" ? "Waiting..." : gesture.toUpperCase()}
// // // //         </div>
// // // //       </div>
// // // //       <div>
// // // //         <h2>Logs:</h2>
// // // //         <textarea
// // // //           value={log.join("\n")}
// // // //           readOnly
// // // //           style={{
// // // //             width: "100%",
// // // //             height: "200px",
// // // //             padding: "10px",
// // // //             fontSize: "14px",
// // // //             border: "1px solid #ddd",
// // // //             borderRadius: "5px",
// // // //           }}
// // // //         ></textarea>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import React, { useState, useEffect } from "react";

// // // // Define regex patterns
// // // const POSTURE_PATTERN = /Posture\s+=\s+#\d+\s+\{(love|like|dislike|flathand|crosshand|fist)\}/i;
// // // const GESTURE_PATTERN = /Gesture\s+(right|left|up|down|tap|double\s+tap|go\s+away)/i;

// // // // Emoji mappings
// // // const EMOJI_MAP = {
// // //   love: "❤️",
// // //   like: "👍",
// // //   dislike: "👎",
// // //   flathand: "✋",
// // //   crosshand: "❌",
// // //   fist: "✊",
// // //   right: "➡️",
// // //   left: "⬅️",
// // //   up: "⬆️",
// // //   down: "⬇️",
// // //   tap: "🖱️",
// // //   "double tap": "👆👆",
// // //   "go away": "🌀",
// // //   none: "🤔",
// // // };

// // // export default function App() {
// // //   const [connected, setConnected] = useState(false);
// // //   const [gesture, setGesture] = useState("none");
// // //   const [emoji, setEmoji] = useState(EMOJI_MAP["none"]);
// // //   const [log, setLog] = useState([]);

// // //   const connectSerialPort = async () => {
// // //     try {
// // //       const port = await navigator.serial.requestPort();
// // //       await port.open({ baudRate: 115200 });

// // //       const textDecoder = new TextDecoderStream();
// // //       const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
// // //       const reader = textDecoder.readable.getReader();

// // //       setConnected(true);

// // //       // Handle serial data with a buffered reader
// // //       handleSerialData(reader);
// // //     } catch (err) {
// // //       setLog((prev) => [`Error: ${err.message}`, ...prev]);
// // //       setConnected(false);
// // //     }
// // //   };

// // //   const handleSerialData = async (reader) => {
// // //     let buffer = "";

// // //     while (true) {
// // //       const { value, done } = await reader.read();
// // //       if (done) {
// // //         reader.releaseLock();
// // //         break;
// // //       }

// // //       buffer += value;

// // //       // Process only when a complete line is received
// // //       if (buffer.includes("\n")) {
// // //         const lines = buffer.split("\n");
// // //         for (let i = 0; i < lines.length - 1; i++) {
// // //           processLine(lines[i].trim());
// // //         }
// // //         buffer = lines[lines.length - 1]; // Retain incomplete line
// // //       }
// // //     }
// // //   };

// // //   const processLine = (line) => {
// // //     // Match gestures and postures
// // //     let detectedGesture = "none";

// // //     const postureMatch = POSTURE_PATTERN.exec(line);
// // //     if (postureMatch) {
// // //       detectedGesture = postureMatch[1].toLowerCase();
// // //     }

// // //     const gestureMatch = GESTURE_PATTERN.exec(line);
// // //     if (gestureMatch) {
// // //       detectedGesture = gestureMatch[1].toLowerCase();
// // //     }

// // //     // Update state if a gesture or posture is detected
// // //     if (detectedGesture !== "none") {
// // //       setGesture(detectedGesture);
// // //       setEmoji(EMOJI_MAP[detectedGesture] || "🤔");
// // //       setLog((prev) => [`${new Date().toLocaleTimeString()} - ${detectedGesture}`, ...prev]);
// // //     } else {
// // //       setLog((prev) => [`${new Date().toLocaleTimeString()} - No Match: ${line}`, ...prev]);
// // //     }
// // //   };

// // //   const disconnectSerialPort = () => {
// // //     setConnected(false);
// // //     setLog((prev) => [`${new Date().toLocaleTimeString()} - Disconnected`, ...prev]);
// // //   };

// // //   // Debounce log updates to avoid flooding the UI
// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       setLog((prev) => prev.slice(0, 20)); // Keep the last 20 logs
// // //     }, 200);
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   return (
// // //     <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
// // //       <h1 style={{ textAlign: "center", color: "#0078D7" }}>Real-Time Gesture Detector</h1>
// // //       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
// // //         <button
// // //           onClick={connectSerialPort}
// // //           style={{
// // //             padding: "10px 20px",
// // //             fontSize: "16px",
// // //             backgroundColor: connected ? "#28A745" : "#0078D7",
// // //             color: "white",
// // //             border: "none",
// // //             borderRadius: "5px",
// // //             cursor: connected ? "not-allowed" : "pointer",
// // //           }}
// // //           disabled={connected}
// // //         >
// // //           {connected ? "Connected" : "Connect"}
// // //         </button>
// // //         <button
// // //           onClick={disconnectSerialPort}
// // //           style={{
// // //             padding: "10px 20px",
// // //             fontSize: "16px",
// // //             backgroundColor: "#DC3545",
// // //             color: "white",
// // //             border: "none",
// // //             borderRadius: "5px",
// // //             cursor: connected ? "pointer" : "not-allowed",
// // //           }}
// // //           disabled={!connected}
// // //         >
// // //           Disconnect
// // //         </button>
// // //       </div>
// // //       <div style={{ textAlign: "center", marginBottom: "20px" }}>
// // //         <h2>Detected Gesture:</h2>
// // //         <div
// // //           style={{
// // //             fontSize: "36px",
// // //             fontWeight: "bold",
// // //             color: "#0078D7",
// // //             padding: "10px",
// // //             border: "2px solid #0078D7",
// // //             borderRadius: "10px",
// // //             display: "inline-block",
// // //           }}
// // //         >
// // //           {gesture === "none" ? "Waiting..." : `${emoji} ${gesture.toUpperCase()}`}
// // //         </div>
// // //       </div>
// // //       <div>
// // //         <h2>Logs:</h2>
// // //         <textarea
// // //           value={log.join("\n")}
// // //           readOnly
// // //           style={{
// // //             width: "100%",
// // //             height: "200px",
// // //             padding: "10px",
// // //             fontSize: "14px",
// // //             border: "1px solid #ddd",
// // //             borderRadius: "5px",
// // //           }}
// // //         ></textarea>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from "react";

// // // Define regex patterns
// // const POSTURE_PATTERN = /Posture\s+=\s+#\d+\s+\{(love|like|dislike|flathand|CrossHands|fist)\}/i;
// // const GESTURE_PATTERN = /Gesture\s+(right|left|UP|down|tap|double\s+tap|gw\s+away)/i;

// // // Emoji mappings
// // const EMOJI_MAP = {
// //   love: "❤️",
// //   like: "👍",
// //   dislike: "👎",
// //   flathand: "✋",
// //   CrossHands: "❌",
// //   fist: "✊",
// //   right: "➡️",
// //   left: "⬅️",
// //   UP: "⬆️",
// //   down: "⬇️",
// //   tap: "🖱️",
// //   "double tap": "👆👆",
// //   "gw away": "🌀",
// //   none: "🤔",
// // };

// // export default function App() {
// //   const [connected, setConnected] = useState(false);
// //   const [gesture, setGesture] = useState("none");
// //   const [emoji, setEmoji] = useState(EMOJI_MAP["none"]);
// //   const [log, setLog] = useState([]);
// //   const [lastSpokenGesture, setLastSpokenGesture] = useState(null);

// //   const connectSerialPort = async () => {
// //     try {
// //       const port = await navigator.serial.requestPort();
// //       await port.open({ baudRate: 115200 });

// //       const textDecoder = new TextDecoderStream();
// //       const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
// //       const reader = textDecoder.readable.getReader();

// //       setConnected(true);

// //       // Handle serial data with a buffered reader
// //       handleSerialData(reader);
// //     } catch (err) {
// //       setLog((prev) => [`Error: ${err.message}`, ...prev]);
// //       setConnected(false);
// //     }
// //   };

// //   const handleSerialData = async (reader) => {
// //     let buffer = "";

// //     while (true) {
// //       const { value, done } = await reader.read();
// //       if (done) {
// //         reader.releaseLock();
// //         break;
// //       }

// //       buffer += value;

// //       // Process only when a complete line is received
// //       if (buffer.includes("\n")) {
// //         const lines = buffer.split("\n");
// //         for (let i = 0; i < lines.length - 1; i++) {
// //           processLine(lines[i].trim());
// //         }
// //         buffer = lines[lines.length - 1]; // Retain incomplete line
// //       }
// //     }
// //   };

// //   const processLine = (line) => {
// //     let detectedGesture = "none";

// //     const postureMatch = POSTURE_PATTERN.exec(line);
// //     if (postureMatch) {
// //       detectedGesture = postureMatch[1].toLowerCase();
// //     }

// //     const gestureMatch = GESTURE_PATTERN.exec(line);
// //     if (gestureMatch) {
// //       detectedGesture = gestureMatch[1].toLowerCase();
// //     }

// //     if (detectedGesture !== "none") {
// //       setGesture(detectedGesture);
// //       setEmoji(EMOJI_MAP[detectedGesture] || "🤔");
// //       setLog((prev) => [`${new Date().toLocaleTimeString()} - ${detectedGesture}`, ...prev]);

// //       // Speak the gesture only if it hasn't been spoken recently
// //       if (lastSpokenGesture !== detectedGesture) {
// //         setLastSpokenGesture(detectedGesture);
// //         speakGesture(detectedGesture);
// //       }
// //     } else {
// //       setLog((prev) => [`${new Date().toLocaleTimeString()} - No Match: ${line}`, ...prev]);
// //     }
// //   };

// //   const speakGesture = (gesture) => {
// //     const utterance = new SpeechSynthesisUtterance(gesture);
// //     window.speechSynthesis.speak(utterance);
// //   };

// //   const disconnectSerialPort = () => {
// //     setConnected(false);
// //     setLog((prev) => [`${new Date().toLocaleTimeString()} - Disconnected`, ...prev]);
// //   };

// //   // Debounce log updates to avoid flooding the UI
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setLog((prev) => prev.slice(0, 20)); // Keep the last 20 logs
// //     }, 200);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
// //       <h1 style={{ textAlign: "center", color: "#0078D7" }}>Real-Time Gesture Detector</h1>
// //       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
// //         <button
// //           onClick={connectSerialPort}
// //           style={{
// //             padding: "10px 20px",
// //             fontSize: "16px",
// //             backgroundColor: connected ? "#28A745" : "#0078D7",
// //             color: "white",
// //             border: "none",
// //             borderRadius: "5px",
// //             cursor: connected ? "not-allowed" : "pointer",
// //           }}
// //           disabled={connected}
// //         >
// //           {connected ? "Connected" : "Connect"}
// //         </button>
// //         <button
// //           onClick={disconnectSerialPort}
// //           style={{
// //             padding: "10px 20px",
// //             fontSize: "16px",
// //             backgroundColor: "#DC3545",
// //             color: "white",
// //             border: "none",
// //             borderRadius: "5px",
// //             cursor: connected ? "pointer" : "not-allowed",
// //           }}
// //           disabled={!connected}
// //         >
// //           Disconnect
// //         </button>
// //       </div>
// //       <div style={{ textAlign: "center", marginBottom: "20px" }}>
// //         <h2>Detected Gesture:</h2>
// //         <div
// //           style={{
// //             fontSize: "36px",
// //             fontWeight: "bold",
// //             color: "#0078D7",
// //             padding: "10px",
// //             border: "2px solid #0078D7",
// //             borderRadius: "10px",
// //             display: "inline-block",
// //           }}
// //         >
// //           {gesture === "none" ? "Waiting..." : `${emoji} ${gesture.toUpperCase()}`}
// //         </div>
// //       </div>
// //       <div>
// //         <h2>Available Gestures:</h2>
// //         <div
// //           style={{
// //             fontSize: "24px",
// //             display: "flex",
// //             flexWrap: "wrap",
// //             gap: "15px",
// //             justifyContent: "center",
// //             marginBottom: "20px",
// //           }}
// //         >
// //           {Object.entries(EMOJI_MAP).map(([key, emoji]) =>
// //             key !== "none" ? (
// //               <span key={key} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
// //                 {emoji}
// //               </span>
// //             ) : null
// //           )}
// //         </div>
// //       </div>
// //       <div>
// //         <h2>Logs:</h2>
// //         <textarea
// //           value={log.join("\n")}
// //           readOnly
// //           style={{
// //             width: "100%",
// //             height: "200px",
// //             padding: "10px",
// //             fontSize: "14px",
// //             border: "1px solid #ddd",
// //             borderRadius: "5px",
// //           }}
// //         ></textarea>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";

// const App = () => {
//   const [heatmapData, setHeatmapData] = useState(Array(8).fill(Array(8).fill(0)));
//   const [gesture, setGesture] = useState("None");
//   const [log, setLog] = useState([]);

//   const NUMBER_PATTERN = /-?\d+/g; // Regex to extract numbers
//   let buffer = ""; // Buffer to store incoming serial data

//   // Function to process and parse incoming serial data
//   const processLine = (line) => {
//     console.log("Raw Line Received:", line); // Debugging
//     const numbers = Array.from(line.matchAll(NUMBER_PATTERN)).map((match) => parseFloat(match[0]));

//     if (numbers.length >= 64) {
//       console.log("Updating Heatmap and Detecting Gesture...");
//       updateHeatmap(numbers.slice(0, 64));
//       detectGesture(numbers.slice(0, 64));
//     } else {
//       console.warn("Insufficient numbers in line:", numbers.length); // Handle incomplete data
//     }
//   };

//   // Function to handle serial data
//   const handleSerialData = (incomingData) => {
//     buffer += incomingData;
//     if (buffer.includes("\n")) {
//       const lines = buffer.split("\n");
//       lines.slice(0, -1).forEach((line) => processLine(line.trim())); // Process full lines
//       buffer = lines[lines.length - 1]; // Keep the last partial line
//     }
//   };

//   // Function to update the heatmap
//   const updateHeatmap = (numbers) => {
//     const matrix = Array.from({ length: 8 }, (_, i) => numbers.slice(i * 8, i * 8 + 8));
//     setHeatmapData(matrix);
//   };

//   // Gesture detection logic
//   const detectGesture = (numbers) => {
//     // Example: Detect a simple gesture based on predefined ranges
//     const sum = numbers.reduce((acc, val) => acc + val, 0);

//     if (sum > 5000) {
//       setGesture("Gesture A");
//     } else if (sum < -5000) {
//       setGesture("Gesture B");
//     } else {
//       setGesture("None");
//     }
//   };

//   // Simulated data stream for testing (replace this with real sensor input in production)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const fakeData = Array.from({ length: 64 }, () => Math.floor(Math.random() * 2000 - 1000)).join(" ");
//       handleSerialData(fakeData + "\n");
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>🔥 Real-Time 8x8 Heatmap with Gesture Detection</h1>

//       {/* Display Gesture */}
//       <h2>Detected Gesture: {gesture}</h2>

//       {/* Heatmap */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 50px)", gap: "5px" }}>
//         {heatmapData.flat().map((value, index) => (
//           <div
//             key={index}
//             style={{
//               width: "50px",
//               height: "50px",
//               backgroundColor: `rgb(${Math.min(value, 255)}, 0, ${Math.abs(Math.min(value, 255))})`,
//               color: "#fff",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               border: "1px solid #000",
//             }}
//           >
//             {value}
//           </div>
//         ))}
//       </div>

//       {/* Log for Debugging */}
//       <div style={{ marginTop: "20px", maxHeight: "200px", overflowY: "scroll", backgroundColor: "#333", color: "#fff", padding: "10px" }}>
//         <h3>Sensor Logs:</h3>
//         {log.map((entry, idx) => (
//           <p key={idx}>{entry}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;



// import React, { useState, useEffect } from "react";

// const POSTURE_PATTERN = /Posture\s+=\s+#\d+\s+\{(love|like|dislike|flathand|CrossHands|fist)\}/i;
// const GESTURE_PATTERN = /Gesture\s+(right|left|UP|down|tap|double\s+tap|gw\s+away)/i;

// const EMOJI_MAP = {
//   love: "❤",
//   like: "👍",
//   dislike: "👎",
//   flathand: "✋",
//   CrossHands: "❌",
//   fist: "✊",
//   right: "➡",
//   left: "⬅",
//   UP: "⬆",
//   down: "⬇",
//   tap: "🖱",
//   "double tap": "👆👆",
//   "gw away": "🌀",
//   none: "🤔",
// };

// export default function App() {
//   const [connected, setConnected] = useState(false);
//   const [gesture, setGesture] = useState("none");
//   const [emoji, setEmoji] = useState(EMOJI_MAP["none"]);
//   const [heatmapData, setHeatmapData] = useState(Array(8).fill(Array(8).fill(0)));

//   const connectSerialPort = async () => {
//     try {
//       const port = await navigator.serial.requestPort();
//       await port.open({ baudRate: 115200 });

//       const textDecoder = new TextDecoderStream();
//       const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
//       const reader = textDecoder.readable.getReader();

//       setConnected(true);
//       handleSerialData(reader);
//     } catch (err) {
//       console.error("Error:", err.message);
//       setConnected(false);
//     }
//   };

//   const handleSerialData = async (reader) => {
//     let buffer = "";

//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) {
//         reader.releaseLock();
//         break;
//       }

//       buffer += value;

//       if (buffer.includes("\n")) {
//         const lines = buffer.split("\n");
//         for (let i = 0; i < lines.length - 1; i++) {
//           processLine(lines[i].trim());
//         }
//         buffer = lines[lines.length - 1];
//       }
//     }
//   };

//   const processLine = (line) => {
//     let detectedGesture = "none";

//     const postureMatch = POSTURE_PATTERN.exec(line);
//     if (postureMatch) {
//       detectedGesture = postureMatch[1].toLowerCase();
//     }

//     const gestureMatch = GESTURE_PATTERN.exec(line);
//     if (gestureMatch) {
//       detectedGesture = gestureMatch[1].toLowerCase();
//     }

//     if (detectedGesture !== "none") {
//       setGesture(detectedGesture);
//       setEmoji(EMOJI_MAP[detectedGesture] || "🤔");
//     }

//     const numberPattern = /-?\d+/g;
//     const numbers = Array.from(line.matchAll(numberPattern)).map((match) => parseInt(match[0], 10));

//     if (numbers.length >= 64) {
//       updateHeatmap(numbers.slice(0, 64));
//     }
//   };

//   const updateHeatmap = (numbers) => {
//     const matrix = Array.from({ length: 8 }, (_, i) => numbers.slice(i * 8, i * 8 + 8));
//     setHeatmapData(matrix);
//   };

//   const disconnectSerialPort = () => {
//     setConnected(false);
//   };

//   const speakGesture = (gesture) => {
//     const utterance = new SpeechSynthesisUtterance(gesture);
//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     if (gesture !== "none") {
//       speakGesture(gesture);
//     }
//   }, [gesture]);

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", padding: "20px", backgroundColor: "#f9f9f9" }}>
//       <h1 style={{ textAlign: "center", color: "#333", marginBottom: "10px" }}>Real-time Gesture Detector</h1>
//       <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "20px" }}>
//         {Object.values(EMOJI_MAP).join(" ")}
//       </p>

//       <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
//         <div style={{ flex: 1 }}>
//           <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
//             <button
//               onClick={connectSerialPort}
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: connected ? "#9E9E9E" : "#4CAF50",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "8px",
//                 fontSize: "16px",
//                 cursor: connected ? "not-allowed" : "pointer",
//               }}
//               disabled={connected}
//             >
//               Connect
//             </button>
//             <button
//               onClick={disconnectSerialPort}
//               style={{
//                 padding: "10px 20px",
//                 backgroundColor: "#f44336",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "8px",
//                 fontSize: "16px",
//                 cursor: connected ? "pointer" : "not-allowed",
//               }}
//               disabled={!connected}
//             >
//               Disconnect
//             </button>
//           </div>
//           <div
//             style={{
//               textAlign: "center",
//               fontSize: "20px",
//               fontWeight: "bold",
//               color: "#4CAF50",
//               border: "2px solid #4CAF50",
//               borderRadius: "8px",
//               padding: "15px",
//               backgroundColor: "#f1f1f1",
//             }}
//           >
//             {gesture === "none" ? "Waiting..." : `${emoji} ${gesture.toUpperCase()}`}
//           </div>
//         </div>

//         <div
//           style={{
//             flex: 1,
//             backgroundColor: "#ffffff",
//             borderRadius: "10px",
//             padding: "20px",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           }}
//         >
//           <h2 style={{ textAlign: "center", color: "#4CAF50", fontSize: "20px", marginBottom: "10px" }}>Heatmap</h2>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "5px" }}>
//             {heatmapData.flat().map((value, index) => (
//               <div
//                 key={index}
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   backgroundColor: `hsl(${Math.min(value, 255)}, 100%, 50%)`,
//                   color: "#fff",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontSize: "12px",
//                   fontWeight: "bold",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {value}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";

// const POSTURE_PATTERN = /Posture\s+=\s+#\d+\s+\{(love|like|dislike|flathand|CrossHands|fist)\}/i;
// const GESTURE_PATTERN = /Gesture\s+(right|left|UP|down|tap|double\s+tap|gw\s+away)/i;

// const EMOJI_MAP = {
//   love: "❤",
//   like: "👍",
//   dislike: "👎",
//   flathand: "✋",
//   CrossHands: "🙅",
//   fist: "✊",
//   right: "➡",
//   left: "⬅",
//   UP: "⬆",
//   down: "⬇",
//   tap: "🖱",
//   "double tap": "👆👆",
//   "gw away": "🌀",
//   none: "🤔",
// };

// export default function App() {
//   const [connected, setConnected] = useState(false);
//   const [gesture, setGesture] = useState("none");
//   const [emoji, setEmoji] = useState(EMOJI_MAP["none"]);
//   const [heatmapData, setHeatmapData] = useState(Array(8).fill(Array(8).fill(0)));

//   const connectSerialPort = async () => {
//     try {
//       const port = await navigator.serial.requestPort();
//       await port.open({ baudRate: 115200 });

//       const textDecoder = new TextDecoderStream();
//       const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
//       const reader = textDecoder.readable.getReader();

//       setConnected(true);
//       handleSerialData(reader);
//     } catch (err) {
//       console.error("Error:", err.message);
//       setConnected(false);
//     }
//   };

//   const handleSerialData = async (reader) => {
//     let buffer = "";

//     while (true) {
//       const { value, done } = await reader.read();
//       if (done) {
//         reader.releaseLock();
//         break;
//       }

//       buffer += value;

//       if (buffer.includes("\n")) {
//         const lines = buffer.split("\n");
//         for (let i = 0; i < lines.length - 1; i++) {
//           processLine(lines[i].trim());
//         }
//         buffer = lines[lines.length - 1];
//       }
//     }
//   };

//   const processLine = (line) => {
//     let detectedGesture = "none";

//     const postureMatch = POSTURE_PATTERN.exec(line);
//     if (postureMatch) {
//       detectedGesture = postureMatch[1].toLowerCase();
//     }

//     const gestureMatch = GESTURE_PATTERN.exec(line);
//     if (gestureMatch) {
//       detectedGesture = gestureMatch[1].toLowerCase();
//     }

//     if (detectedGesture !== "none") {
//       setGesture(detectedGesture);
//       setEmoji(EMOJI_MAP[detectedGesture] || "🤔");
//     }

//     const numberPattern = /-?\d+/g;
//     const numbers = Array.from(line.matchAll(numberPattern)).map((match) => parseInt(match[0], 10));

//     if (numbers.length >= 64) {
//       updateHeatmap(numbers.slice(0, 64));
//     }
//   };

//   const updateHeatmap = (numbers) => {
//     const matrix = Array.from({ length: 8 }, (_, i) => numbers.slice(i * 8, i * 8 + 8));
//     setHeatmapData(matrix);
//   };

//   const disconnectSerialPort = () => {
//     setConnected(false);
//   };

//   const speakGesture = (gesture) => {
//     const utterance = new SpeechSynthesisUtterance(gesture);
//     window.speechSynthesis.speak(utterance);
//   };

//   useEffect(() => {
//     if (gesture !== "none") {
//       speakGesture(gesture);
//     }
//   }, [gesture]);

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", padding: "20px", backgroundColor: "#f9f9f9" }}>
//       <h1 style={{ textAlign: "center", color: "#333", marginBottom: "10px", fontSize: "28px" }}>
//         Real-time Gesture Detector
//       </h1>
//       <p style={{ textAlign: "center", fontSize: "20px", marginBottom: "20px" }}>
//         {Object.values(EMOJI_MAP).join(" ")}
//       </p>

//       <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
//         <div style={{ flex: 1 }}>
//           <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
//             <button
//               onClick={connectSerialPort}
//               style={{
//                 padding: "12px 25px",
//                 backgroundColor: connected ? "#9E9E9E" : "#4CAF50",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "8px",
//                 fontSize: "16px",
//                 cursor: connected ? "not-allowed" : "pointer",
//               }}
//               disabled={connected}
//             >
//               Connect
//             </button>
//             <button
//               onClick={disconnectSerialPort}
//               style={{
//                 padding: "12px 25px",
//                 backgroundColor: "#f44336",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "8px",
//                 fontSize: "16px",
//                 cursor: connected ? "pointer" : "not-allowed",
//               }}
//               disabled={!connected}
//             >
//               Disconnect
//             </button>
//           </div>
//           <div
//             style={{
//               textAlign: "center",
//               fontSize: "24px",
//               fontWeight: "bold",
//               color: "#4CAF50",
//               border: "2px solid #4CAF50",
//               borderRadius: "8px",
//               padding: "20px",
//               backgroundColor: "#f1f1f1",
//             }}
//           >
//             {gesture === "none" ? "Waiting..." : `${emoji} ${gesture.toUpperCase()}`}
//           </div>
//         </div>

//         <div
//           style={{
//             flex: 1,
//             backgroundColor: "#ffffff",
//             borderRadius: "10px",
//             padding: "20px",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           }}
//         >
//           <h2 style={{ textAlign: "center", color: "#4CAF50", fontSize: "22px", marginBottom: "10px" }}>Heatmap</h2>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "2px" }}>
//             {heatmapData.flat().map((value, index) => (
//               <div
//                 key={index}
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   backgroundColor: `hsl(${Math.min(value, 255)}, 80%, 70%)`,
//                   color: "#fff",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontSize: "12px",
//                   fontWeight: "bold",
//                   borderRadius: "4px",
//                 }}
//               >
//                 {value}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";

const POSTURE_PATTERN = /Posture\s+=\s+#\d+\s+\{(love|like|dislike|flathand|CrossHands|fist)\}/i;
const GESTURE_PATTERN = /Gesture\s+(right|left|UP|down|tap|double\s+tap|gw\s+away)/i;

const EMOJI_MAP = {
  love: "❤",
  like: "👍",
  dislike: "👎",
  flathand: "✋",
  CrossHands: "🙅",
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
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#555",
              marginBottom: "20px",
            }}
          >
            Combining STMicroelectronics' Gesture and Hand Posture Technologies
          </p>
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
