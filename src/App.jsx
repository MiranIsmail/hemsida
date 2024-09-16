import { useState } from "react";
import "./App.css";
import TimeLogger from "./TimeLogger";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="glow">Time Logger</h1>
      <h2>Pleas be aware that your data is stored locally in a cookie.</h2>
      <h3>If you delete the cookie your data will be gone.</h3>
      <TimeLogger />
    </div>
  );
}

export default App;
