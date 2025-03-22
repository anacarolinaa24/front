import { useNavigate } from "react-router-dom"; // Importa o hook para navegação
import "./Home.css";

const Home = () => {
  const navigate = useNavigate(); // Hook para gerenciar navegação

  const handleLoginClick = () => {
    navigate("/login"); // Redireciona para a página de login
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
