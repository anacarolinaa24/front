import React, { useState } from "react";
import "./User.css";

const User = () => {
  const [username, setUsername] = useState(""); // Estado para o nome de usuário
  const [password, setPassword] = useState(""); // Estado para a senha
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagem de erro
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar o login

  const handleLogin = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
      setErrorMessage(""); // Limpa mensagem de erro
    } else {
      setErrorMessage("Nome de usuário ou senha inválidos!");
    }
  };

  return (
    <div className="userLogin">
      {isLoggedIn ? (
        <div>
          <h2>Bem-vindo, {username}!</h2>
          <p>Você está logado no sistema.</p>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="loginForm">
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu Usuário ou E-mail" // Mensagem dentro do input
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha" // Mensagem dentro do input
            />
          </div>
          <button type="submit">Entrar</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default User;
