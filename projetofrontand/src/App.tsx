import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Options from "./pages/Options";
import DietHistory from "./pages/DietHistory";
import NewDiet from "./pages/NewDiet";
import UserProfile from "./pages/Profile"; // Importando o componente de perfil

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
        <Route path="/diethistory" element={<DietHistory />} />
        <Route path="/newdiet" element={<NewDiet />} />
        <Route path="/profile" element={<UserProfile />} />{" "}
        {/* Nova rota para perfil */}
      </Routes>
    </Router>
  );
}

export default App;
