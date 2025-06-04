import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Options from "./pages/Options";
import NewDiet from "./pages/NewDiet";
import HistoricDiet from "./pages/HistoricDiet";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
        <Route path="/new-diet" element={<NewDiet />} />
        <Route path="/historic-diet" element={<HistoricDiet />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
