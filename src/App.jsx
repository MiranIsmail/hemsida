import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TimeLogger from "./TimeLogger";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Time Logging App</h1>
      <TimeLogger />
    </div>
  );
}

export default App;
