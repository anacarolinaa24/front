import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./components/User";
import RegisterUser from "./components/RegisterUser"; // Renomeie este import
import Register from "./pages/Register";
import Options from "./pages/Options";
import NewDiet from "./components/NewDiet";
import MyDiet from "./components/MyDiet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}>
          <Route path="user" element={<User />} />
          <Route path="user/options" element={<Options />} />
          <Route path="options/newdiet" element={<NewDiet />} />
          <Route path="options/mydiet" element={<MyDiet />} />
        </Route>
        <Route path="/register" element={<Register />}>
          <Route path="register-user" element={<RegisterUser />} />
          <Route path="register-user/options" element={<Options />} />
          <Route path="options/newdiet" element={<NewDiet />} />
          <Route path="options/mydiet" element={<MyDiet />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
