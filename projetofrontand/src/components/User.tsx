import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";
import "../pages/Options";

const User = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Preencha todos os campos");
      return;
    }

    // Simula login bem sucedido
    if (username === "admin" && password === "1234") {
      alert("Login realizado com sucesso!");
      navigate("/options");
    } else {
      setErrorMessage("Usuário ou senha incorretos");
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
            placeholder="Digite seu usuário"
            required
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
            required
          />
        </div>
        <button type="submit">Entrar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default User;
