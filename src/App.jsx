import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { MyContextProvider } from "./Context/MyContext";

function App() {
  return (
    <MyContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </MyContextProvider>
  );
}

export default App;
