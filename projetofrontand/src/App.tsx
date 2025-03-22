import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./components/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
