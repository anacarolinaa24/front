import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import User from "./components/User";
import RegisterUser from "./components/RegisterUser";
import Options from "./components/Options";
import NewDiet from "./pages/MyDiet";
import MyDiet from "./pages/NewDiet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/User" element={<User />} />
        <Route path="/Options" element={<Options />} />
        <Route path="/Options/NewDiet" element={<NewDiet />} />
        <Route path="Options/mydiet" element={<MyDiet />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/Options" element={<Options />} />
        <Route path="Options/newdiet" element={<NewDiet />} />
        <Route path="Options/mydiet" element={<MyDiet />} />
      </Routes>
    </Router>
  );
}

export default App;
