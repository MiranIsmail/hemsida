// TimeLogger.jsx
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

// TimeLogger Component
const TimeLogger = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Load logs from cookies on component mount
    const storedLogs = Cookies.get("timeLogs");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);
  // Helper function to format duration
  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const pad = (num) => String(num).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  // Save logs to cookies
  const saveLogsToCookies = (updatedLogs) => {
    Cookies.set("timeLogs", JSON.stringify(updatedLogs), { expires: 360 }); // Set expiration to 360 days
  };

  // Start logging time
  const handleStart = () => {
    setStartTime(new Date());
  };

  // Stop logging time
  const handleStop = () => {
    if (!startTime) return;

    const currentEndTime = new Date();
    setEndTime(currentEndTime);
    const d = new Date();
    // Create a new log entry
    const newLog = {
      start: startTime,
      end: currentEndTime,
      duration: formatDuration((currentEndTime - startTime) / 1000),
      date: d.toISOString().slice(0, 10),
    };

    // Update logs state and cookies
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    saveLogsToCookies(updatedLogs);

    // Reset times
    setStartTime(null);
    setEndTime(null);
  };

  // Delete a log by index
  const handleDelete = (index) => {
    const updatedLogs = logs.filter((log, i) => i !== index);
    setLogs(updatedLogs);
    saveLogsToCookies(updatedLogs);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button onClick={handleStart} disabled={startTime}>
        Start Logging
      </button>
      <button onClick={handleStop} disabled={!startTime}>
        Stop Logging
      </button>

      {startTime && <p>Started at: {startTime.toLocaleTimeString()}</p>}

      <h3>Time Logs</h3>
      <TimeLogs logs={logs} onDelete={handleDelete} />
    </div>
  );
};

// TimeLogs Component (to display the logs and allow deleting)
const TimeLogs = ({ logs, onDelete }) => {
  const colors = ["#7D98A1", "#1C2321", "#0047AB"]; // Array of colors

  if (logs.length === 0) {
    return <p>No time logs yet!</p>;
  }

  return (
    <div>
      <ul>
        {logs.map((log, index) => (
          <li
            key={index}
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <div style={{ fontSize: "18px", color: "black" }}>
              <strong>Date</strong> {log.date} {""}
              <br />
              <strong>Duration:</strong> {log.duration}
              <br />
              <button onClick={() => onDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLogger;
