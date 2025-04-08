import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";
import "../pages/Options";

const User = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setErrorMessage("");
      alert("Login realizado com sucesso!");
      navigate("/Options");
    } else {
      setErrorMessage("Nome de usuário ou senha inválidos!");
    }
  };

  return (
    <div className="userLogin">
      <form onSubmit={handleLogin} className="loginForm">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Usuário:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu Usuário ou E-mail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit">Entrar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default User;
