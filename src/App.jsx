import StartScreen from "./components/StartScreen";
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <StartScreen />
    </div>
  );
}

export default App;
