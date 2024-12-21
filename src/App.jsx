import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { MyContextProvider } from "./Context/MyContext";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <MyContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/sign-up"
          element={
            <SignUp
              title={"Sign Up"}
              opps={"Log In"}
              sentence={"Already have an account?"}
            />
          }
        />
        <Route
          path="/Log-in"
          element={
            <SignUp
              title={"Log In"}
              opps={"Sign Up"}
              sentence={"New User create an account?"}
            />
          }
        />
      </Routes>
    </MyContextProvider>
  );
}

export default App;
