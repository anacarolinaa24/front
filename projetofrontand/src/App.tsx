import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./components/User";
import RegisterUser from "./components/RegisterUser";
import Options from "./pages/Options";
import NewDiet from "./components/NewDiet";
import MyDiet from "./components/MyDiet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="user" element={<User />} />
        <Route path="user/options" element={<Options />} />
        <Route path="/options/NewDiet" element={<NewDiet />} />
        <Route path="options/mydiet" element={<MyDiet />} />
        <Route path="/register/RegisterUser" element={<RegisterUser />} />
        <Route path="register-user/options" element={<Options />} />
        <Route path="options/newdiet" element={<NewDiet />} />
        <Route path="options/mydiet" element={<MyDiet />} />
      </Routes>
    </Router>
  );
}

export default App;
