import React, { useState } from "react";
import "./User.css";

const User = () => {
  const [username, setUsername] = useState(""); // Estado para o nome de usuário
  const [password, setPassword] = useState(""); // Estado para a senha
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagem de erro
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar o login

  // Função que lida com o envio do formulário
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão de envio
    // Lógica de login simulada
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true); // Marca o usuário como logado
      setErrorMessage(""); // Limpa qualquer mensagem de erro
    } else {
      setErrorMessage("Nome de usuário ou senha inválidos!"); // Define uma mensagem de erro
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
          <label>
            Nome de Usuário:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Atualiza o nome de usuário
              placeholder="Digite seu nome de usuário"
              required
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza a senha
              placeholder="Digite sua senha"
              required
            />
          </label>
          <button type="submit">Entrar</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default User;
