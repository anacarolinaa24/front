import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="paginaInicial">
      <h1 className="bemVindo">Seja bem-vindo!</h1>
      <img src="/src/assets/logo.png" alt="logo" />
      <button className="loginButton" onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
};

export default Home;
