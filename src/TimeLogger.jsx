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

  // Save logs to cookies
  const saveLogsToCookies = (updatedLogs) => {
    Cookies.set("timeLogs", JSON.stringify(updatedLogs), { expires: 7 }); // Set expiration to 7 days
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

    // Create a new log entry
    const newLog = {
      start: startTime,
      end: currentEndTime,
      duration: (currentEndTime - startTime) / 1000, // in seconds
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
      <h2>Time Logger</h2>
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
  if (logs.length === 0) {
    return <p>No time logs yet!</p>;
  }

  return (
    <div>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <div>
              <strong>Start:</strong> {new Date(log.start).toLocaleTimeString()}{" "}
              <br />
              <strong>End:</strong> {new Date(log.end).toLocaleTimeString()}{" "}
              <br />
              <strong>Duration:</strong> {log.duration} seconds
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
