import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./User.css";
import "../components/Options";

const User = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const nagigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setErrorMessage(""); // Limpa mensagem de erro
      alert("Login realizado com sucesso!");
      nagigate("/Options"); // Redireciona para a página de opções
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
