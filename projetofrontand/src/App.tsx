import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./components/User";
import RegisterUser from "./components/RegisterUser"; // Renomeie este import
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/user" element={<User />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Register/RegisterUser" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
