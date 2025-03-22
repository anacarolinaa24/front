import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home"; // Importa o componente Home
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Rota da página inicial */}
        <Route path="/login" element={<Login />} /> {/* Rota do login */}
      </Routes>
    </Router>
  );
}

export default App;
