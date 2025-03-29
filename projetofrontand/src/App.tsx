import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import User from "./components/User";
import RegisterUser from "./components/RegisterUser";
import Options from "./pages/Options";
import NewDiet from "./pages/NewDiet";
import HistoricDiet from "./pages/HistoricDiet";
import FoodSelection from "./components/FoodSelection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/User" element={<User />} />
        <Route path="/Options" element={<Options />} />
        <Route path="/NewDiet" element={<NewDiet />} />
        <Route path="/FoodSelection" element={<FoodSelection />} />
        <Route path="/HistoricDiet" element={<HistoricDiet />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
